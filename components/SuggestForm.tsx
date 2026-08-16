"use client";

import { useState } from "react";
import { SUGGESTION_EMAIL } from "@/lib/constants";

export default function SuggestForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("evento");
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  const subject = encodeURIComponent(
    `Sugestão de ${type === "evento" ? "evento" : "curso"} para a Cria: ${name || "(sem título)"}`,
  );

  const body = encodeURIComponent(
    [
      `Título: ${name}`,
      `Tipo: ${type === "evento" ? "Evento" : "Curso"}`,
      `Cidade (se evento presencial): ${city}`,
      `Nicho sugerido: ${niche}`,
      `Link da página oficial: ${url}`,
      "",
      "Observações:",
      notes,
    ].join("\n"),
  );

  const mailtoHref = `mailto:${SUGGESTION_EMAIL}?subject=${subject}&body=${body}`;
  const canSubmit = name.trim() !== "" && url.trim() !== "";

  return (
    <form className="space-y-4 rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nome do evento/curso" htmlFor="name" required>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ex.: Data Saturday Belo Horizonte"
            className="input"
          />
        </Field>

        <Field label="Tipo" htmlFor="type">
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input"
          >
            <option value="evento">Evento</option>
            <option value="curso">Curso</option>
          </select>
        </Field>

        <Field label="Cidade (se presencial)" htmlFor="city">
          <input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ex.: Belo Horizonte, São Paulo, Online…"
            className="input"
          />
        </Field>

        <Field label="Nicho sugerido" htmlFor="niche">
          <input
            id="niche"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Ex.: Tecnologia, Marketing, Design…"
            className="input"
          />
        </Field>
      </div>

      <Field label="Link da página oficial (Sympla, Luma, Eventbrite…)" htmlFor="url" required>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="https://…"
          className="input"
        />
      </Field>

      <Field label="Observações (opcional)" htmlFor="notes">
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Qualquer contexto extra que ajude na curadoria."
          className="input resize-none"
        />
      </Field>

      <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground/50">
          Ao enviar, abrimos seu app de e-mail com os dados preenchidos —
          nada é salvo automaticamente neste site.
        </p>
        <a
          href={mailtoHref}
          aria-disabled={!canSubmit}
          onClick={(e) => {
            if (!canSubmit) e.preventDefault();
          }}
          className={`inline-flex justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-brand-foreground transition ${
            canSubmit
              ? "bg-brand hover:opacity-90"
              : "cursor-not-allowed bg-brand/40"
          }`}
        >
          Enviar sugestão por e-mail
        </a>
      </div>
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
