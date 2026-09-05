"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CITY_SUGGESTIONS, EDUCATION_STATUS_LABELS } from "@/lib/constants";
import type { EducationStatus } from "@/lib/types";

const EDUCATION_OPTIONS = Object.entries(EDUCATION_STATUS_LABELS) as [
  EducationStatus,
  string,
][];

// Serve tanto pra completar o perfil pela primeira vez quanto pra editar
// depois — em `/perfil`. Se já existe uma linha em `profiles`, pré-preenche
// com ela; se não, só usa o nome que veio do Google.
export default function ProfileForm() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [hadExistingProfile, setHadExistingProfile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [educationStatus, setEducationStatus] =
    useState<EducationStatus>("cursando");
  const [yearsExperience, setYearsExperience] = useState("0");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone, city, education_status, years_experience")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profile) {
        setHadExistingProfile(true);
        setFullName(profile.full_name ?? "");
        setPhone(profile.phone ?? "");
        setCity(profile.city ?? "");
        setEducationStatus(
          (profile.education_status as EducationStatus) ?? "cursando",
        );
        setYearsExperience(String(profile.years_experience ?? 0));
        setConsent(true); // já consentiu quando criou o perfil
      } else {
        const metaName = data.user.user_metadata?.full_name as
          | string
          | undefined;
        if (metaName) setFullName(metaName);
      }

      setCheckingSession(false);
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    if (!consent) {
      setError("Precisa marcar o consentimento pra gente salvar seu perfil.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Sessão expirou — faça login de novo.");
      setSubmitting(false);
      return;
    }

    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      education_status: educationStatus,
      years_experience: Number(yearsExperience),
    });

    setSubmitting(false);

    if (upsertError) {
      setError(
        "Não deu pra salvar agora. Tenta de novo em alguns instantes.",
      );
      return;
    }

    if (hadExistingProfile) {
      // Editando um perfil que já existia: fica na página, só confirma.
      setSaved(true);
      router.refresh();
    } else {
      // Primeira vez completando o perfil: segue pra home.
      router.push("/");
      router.refresh();
    }
  }

  if (checkingSession) {
    return (
      <div className="h-64 animate-pulse rounded-xl border border-border bg-surface" />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nome" htmlFor="fullName" required>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="input"
          />
        </Field>

        <Field label="Telefone (WhatsApp)" htmlFor="phone" required>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="(31) 9XXXX-XXXX"
            className="input"
          />
        </Field>

        <Field label="Cidade" htmlFor="city" required>
          <input
            id="city"
            list="city-suggestions"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="Ex.: Belo Horizonte"
            className="input"
          />
          <datalist id="city-suggestions">
            {CITY_SUGGESTIONS.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>

        <Field label="Momento acadêmico" htmlFor="educationStatus" required>
          <select
            id="educationStatus"
            value={educationStatus}
            onChange={(e) =>
              setEducationStatus(e.target.value as EducationStatus)
            }
            className="input"
          >
            {EDUCATION_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Anos de experiência de mercado"
          htmlFor="yearsExperience"
          required
        >
          <input
            id="yearsExperience"
            type="number"
            min={0}
            max={60}
            value={yearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            required
            className="input"
          />
        </Field>
      </div>

      <label className="flex items-start gap-2 text-xs text-foreground/60">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Autorizo a Cria a guardar esses dados pra personalizar minha
          experiência (ex.: destacar vagas e eventos compatíveis com meu
          perfil). Posso pedir pra apagar quando quiser.
        </span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {saved && !error && (
        <p className="text-sm text-brand-green">Perfil atualizado ✓</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90 disabled:opacity-50"
      >
        {submitting
          ? "Salvando…"
          : hadExistingProfile
            ? "Salvar alterações"
            : "Salvar e continuar"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1 text-sm">
      <span className="font-medium">
        {label} {required && <span className="text-brand">*</span>}
      </span>
      {children}
    </label>
  );
}
