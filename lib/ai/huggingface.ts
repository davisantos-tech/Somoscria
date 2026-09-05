import { NICHE_LABELS } from "../constants";
import type { Niche } from "../types";

// Classificação zero-shot (não precisa treinar nada) via Hugging Face
// Inference API — usada só pra SUGERIR o nicho de um candidato encontrado
// pelos scrapers. Nunca escreve nem publica nada sozinha: o humano que
// revisa `candidate_events` confirma ou troca antes de virar EventItem de
// verdade. Isso preserva a promessa do /sobre ("quem decide o que entra no
// ar é sempre gente de verdade").
//
// Modelo multilíngue (funciona em português) de classificação zero-shot,
// hospedado gratuitamente na Inference API do Hugging Face.
const MODEL = "MoritzLaurer/mDeBERTa-v3-base-mnli-xnli";
const SCORE_THRESHOLD = 0.4;
const MAX_LABELS = 2;

const LABEL_TO_NICHE = new Map<string, Niche>(
  (Object.entries(NICHE_LABELS) as [Niche, string][]).map(([niche, label]) => [
    label.toLowerCase(),
    niche,
  ]),
);
const CANDIDATE_LABELS = Object.values(NICHE_LABELS);

interface HFZeroShotResponse {
  labels: string[];
  scores: number[];
}

/**
 * Sugere até 2 nichos pra um título de evento/vaga. Retorna `null` (nunca
 * lança erro) quando não há token configurado, a API falha, ou o modelo
 * ainda está "esquentando" — o scraper deve seguir em frente sem nicho
 * sugerido nesses casos, nunca travar por causa disso.
 */
export async function suggestNiche(
  text: string,
  { retryOnColdStart = true }: { retryOnColdStart?: boolean } = {},
): Promise<Niche[] | null> {
  const token = process.env.HUGGINGFACE_API_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: { candidate_labels: CANDIDATE_LABELS, multi_label: true },
        }),
      },
    );

    // Modelo "frio" (primeira chamada depois de um tempo sem uso) — a API
    // devolve 503 com estimated_time; espera uma vez e tenta de novo.
    if (res.status === 503 && retryOnColdStart) {
      const body = await res.json().catch(() => null);
      const waitMs = Math.min(
        Math.ceil((body?.estimated_time ?? 15) * 1000),
        30_000,
      );
      await new Promise((r) => setTimeout(r, waitMs));
      return suggestNiche(text, { retryOnColdStart: false });
    }

    if (!res.ok) {
      console.warn(
        `  ⚠️  Hugging Face: HTTP ${res.status} ao classificar "${text}", pulando sugestão de nicho.`,
      );
      return null;
    }

    const data = (await res.json()) as HFZeroShotResponse;

    const niches: Niche[] = [];
    for (let i = 0; i < data.labels.length && niches.length < MAX_LABELS; i++) {
      if (data.scores[i] < SCORE_THRESHOLD) break; // já vem ordenado por score
      const niche = LABEL_TO_NICHE.get(data.labels[i].toLowerCase());
      if (niche) niches.push(niche);
    }

    return niches.length > 0 ? niches : null;
  } catch (e) {
    console.warn("  ⚠️  Hugging Face: erro de rede, pulando sugestão de nicho —", e);
    return null;
  }
}
