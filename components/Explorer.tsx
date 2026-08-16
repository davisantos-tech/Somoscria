"use client";

import { useMemo, useState } from "react";
import ItemCard from "./ItemCard";
import { CITY_LABELS, NICHE_LABELS } from "@/lib/constants";
import type {
  CatalogItem,
  City,
  CityFilter,
  Niche,
  NicheFilter,
  TypeFilter,
} from "@/lib/types";

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: "todos", label: "Todos os tipos" },
  { value: "vaga", label: "Vaga" },
  { value: "evento", label: "Evento (qualquer)" },
  { value: "evento-presencial", label: "Evento presencial" },
  { value: "evento-online", label: "Evento online" },
  { value: "curso", label: "Curso (qualquer)" },
  { value: "curso-gratuito", label: "Curso gratuito" },
  { value: "curso-pago", label: "Curso pago" },
];

const EVENTO_TYPES: TypeFilter[] = [
  "todos",
  "evento",
  "evento-presencial",
  "evento-online",
];
const CURSO_TYPES: TypeFilter[] = ["todos", "curso", "curso-gratuito", "curso-pago"];
const VAGA_TYPES: TypeFilter[] = ["todos", "vaga"];

// Remove acentos para permitir buscar "sao paulo" e encontrar "São Paulo".
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function Explorer({
  items,
  cities,
  initialType = "todos",
}: {
  items: CatalogItem[];
  cities: City[];
  initialType?: TypeFilter;
}) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<CityFilter>("todas");
  const [niche, setNiche] = useState<NicheFilter>("todos");
  const [type, setType] = useState<TypeFilter>(initialType);

  const niches = useMemo(() => {
    const present = new Set<Niche>();
    items.forEach((item) => item.niche.forEach((n) => present.add(n)));
    return Array.from(present).sort((a, b) =>
      NICHE_LABELS[a].localeCompare(NICHE_LABELS[b], "pt-BR"),
    );
  }, [items]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return items.filter((item) => {
      if (q && !normalize(item.title).includes(q)) return false;
      if (niche !== "todos" && !item.niche.includes(niche)) return false;

      if (item.type === "evento") {
        if (!EVENTO_TYPES.includes(type)) return false;
        if (city !== "todas" && item.city !== city) return false;
        if (type === "evento-presencial" && item.city === "online")
          return false;
        if (type === "evento-online" && item.city !== "online") return false;
      } else if (item.type === "curso") {
        if (!CURSO_TYPES.includes(type)) return false;
        // Cursos não têm cidade (são online por natureza); só entram
        // quando o filtro de cidade está em "todas".
        if (city !== "todas") return false;
        if (type === "curso-gratuito" && !item.isFree) return false;
        if (type === "curso-pago" && item.isFree) return false;
      } else {
        // vaga
        if (!VAGA_TYPES.includes(type)) return false;
        if (city !== "todas" && item.city !== city) return false;
      }

      return true;
    });
  }, [items, query, city, niche, type]);

  const hasActiveFilters =
    query.trim() !== "" || city !== "todas" || niche !== "todos" || type !== "todos";

  function clearFilters() {
    setQuery("");
    setCity("todas");
    setNiche("todos");
    setType("todos");
  }

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <label className="sr-only" htmlFor="search">
          Buscar evento, curso ou vaga
        </label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome do evento, curso ou vaga…"
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-foreground/40 focus:border-brand"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <FilterSelect
            label="Cidade"
            value={city}
            onChange={(v) => setCity(v as CityFilter)}
            options={[
              { value: "todas", label: "Todas as cidades" },
              ...cities.map((c) => ({ value: c, label: CITY_LABELS[c] })),
            ]}
          />
          <FilterSelect
            label="Nicho"
            value={niche}
            onChange={(v) => setNiche(v as NicheFilter)}
            options={[
              { value: "todos", label: "Todos os nichos" },
              ...niches.map((n) => ({ value: n, label: NICHE_LABELS[n] })),
            ]}
          />
          <FilterSelect
            label="Tipo"
            value={type}
            onChange={(v) => setType(v as TypeFilter)}
            options={TYPE_OPTIONS}
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="self-start text-xs text-brand hover:underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-foreground/60">
        {filtered.length}{" "}
        {filtered.length === 1
          ? "resultado encontrado"
          : "resultados encontrados"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-border p-10 text-center text-sm text-foreground/60">
          Nada encontrado com esses filtros. Tenta ajustar a busca — ou{" "}
          <a href="/sugerir" className="text-brand hover:underline">
            sugira você mesmo
          </a>
          .
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-foreground/60">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-brand"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
