"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Cat } from "@/lib/types";
import { publicCatPath } from "@/lib/cats";

type SexFilter = "Tous" | "Mâle" | "Femelle";
type AgeFilter = "Tous les âges" | "Jeune (moins d'1 an)" | "Adulte (1 à 7 ans)" | "Senior (8 ans et +)";

function ageInYears(value: string) {
  const text = value.toLowerCase().replace(",", ".");
  const months = text.match(/(\d+(?:\.\d+)?)\s*mois/);
  if (months) return Number(months[1]) / 12;
  const years = text.match(/(\d+(?:\.\d+)?)\s*ans?/);
  if (years) return Number(years[1]);
  const number = text.match(/\d+(?:\.\d+)?/);
  return number ? Number(number[0]) : null;
}

export default function AdoptionFilters({ cats }: { cats: Cat[] }) {
  const [sex, setSex] = useState<SexFilter>("Tous");
  const [age, setAge] = useState<AgeFilter>("Tous les âges");

  const filtered = useMemo(() => cats.filter((cat) => {
    if (sex !== "Tous" && cat.sex !== sex) return false;
    const years = ageInYears(cat.age);
    if (age === "Tous les âges" || years === null) return age === "Tous les âges";
    if (age === "Jeune (moins d'1 an)") return years < 1;
    if (age === "Adulte (1 à 7 ans)") return years >= 1 && years < 8;
    return years >= 8;
  }), [cats, sex, age]);

  return (
    <>
      <section className="adoption-filter-card" aria-label="Filtres des chats">
        <div className="adoption-filter-field">
          <label htmlFor="sex-filter">Sexe</label>
          <select id="sex-filter" value={sex} onChange={(e) => setSex(e.target.value as SexFilter)}>
            <option>Tous</option>
            <option>Mâle</option>
            <option>Femelle</option>
          </select>
        </div>
        <div className="adoption-filter-field">
          <label htmlFor="age-filter">Âge</label>
          <select id="age-filter" value={age} onChange={(e) => setAge(e.target.value as AgeFilter)}>
            <option>Tous les âges</option>
            <option>Jeune (moins d'1 an)</option>
            <option>Adulte (1 à 7 ans)</option>
            <option>Senior (8 ans et +)</option>
          </select>
        </div>
        <div className="adoption-filter-field">
          <label htmlFor="status-filter">Statut</label>
          <select id="status-filter" value="Disponibles et réservés" disabled>
            <option>Disponibles et réservés</option>
          </select>
        </div>
      </section>

      <p className="adoption-count">{filtered.length} {filtered.length > 1 ? "chats" : "chat"}</p>

      {filtered.length > 0 ? (
        <section className="grid adoption-grid" aria-label="Chats à l'adoption">
          {filtered.map((cat) => (
            <article className="card cat-card" key={cat.id}>
              {cat.photos?.[0] ? (
                <img className="cat-photo" src={cat.photos[0]} alt={`Photo de ${cat.name}`} />
              ) : (
                <div className="cat-photo cat-photo-empty">Photo à venir</div>
              )}
              <div className="card-body stack">
                <span className="badge green">Disponible</span>
                <div>
                  <h2>{cat.name}</h2>
                  <p className="cat-meta">{cat.age} · {cat.sex}</p>
                </div>
                <p className="cat-teaser">{cat.personality}</p>
                <Link className="btn full-btn" href={publicCatPath(cat.slug)}>Faire connaissance</Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>Aucun chat ne correspond à ces critères.</h2>
          <p>Essayez de modifier les filtres pour découvrir d'autres profils.</p>
        </section>
      )}
    </>
  );
}
