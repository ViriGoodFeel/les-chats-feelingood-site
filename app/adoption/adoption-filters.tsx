"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Cat } from "@/lib/types";
import { publicCatPath } from "@/lib/cats";

type SexFilter = "Tous" | "Mâle" | "Femelle";
type AgeFilter = "Tous les âges" | "Moins d'1 an" | "1 à 7 ans" | "8 à 11 ans" | "12 ans et +";
type CompatibilityFilter = "Tous" | "OK" | "Pas OK";

function ageInYears(value: string) {
  const text = value.toLowerCase().replace(",", ".");
  const months = text.match(/(\d+(?:\.\d+)?)\s*mois/);
  if (months) return Number(months[1]) / 12;
  const years = text.match(/(\d+(?:\.\d+)?)\s*ans?/);
  if (years) return Number(years[1]);
  const number = text.match(/\d+(?:\.\d+)?/);
  return number ? Number(number[0]) : null;
}

function matchesCompatibility(value: string | undefined, filter: CompatibilityFilter) {
  if (filter === "Tous") return true;
  if (filter === "OK") return value === "Compatible";
  return value === "Non compatible";
}

export default function AdoptionFilters({ cats }: { cats: Cat[] }) {
  const [sex, setSex] = useState<SexFilter>("Tous");
  const [age, setAge] = useState<AgeFilter>("Tous les âges");
  const [catsFilter, setCatsFilter] = useState<CompatibilityFilter>("Tous");
  const [dogs, setDogs] = useState<CompatibilityFilter>("Tous");
  const [children, setChildren] = useState<CompatibilityFilter>("Tous");

  const filtered = useMemo(() => cats.filter((cat) => {
    if (sex !== "Tous" && cat.sex !== sex) return false;
    const years = ageInYears(cat.age);
    if (age !== "Tous les âges") {
      if (years === null) return false;
      if (age === "Moins d'1 an" && years >= 1) return false;
      if (age === "1 à 7 ans" && (years < 1 || years >= 8)) return false;
      if (age === "8 à 11 ans" && (years < 8 || years >= 12)) return false;
      if (age === "12 ans et +" && years < 12) return false;
    }
    if (!matchesCompatibility(cat.compatibility_cats, catsFilter)) return false;
    if (!matchesCompatibility(cat.compatibility_dogs, dogs)) return false;
    if (!matchesCompatibility(cat.compatibility_children, children)) return false;
    return true;
  }), [cats, sex, age, catsFilter, dogs, children]);

  return (
    <>
      <div className="adoption-page-nav">
        <Link className="btn secondary" href="/">← Retour à l’accueil</Link>
        <Link className="adoption-home-link" href="/">Les Chats de Feelin’ Good</Link>
      </div>
      <section className="adoption-filter-card" aria-label="Filtres des chats">
        <div className="adoption-filter-field"><label htmlFor="sex-filter">Sexe</label><select id="sex-filter" value={sex} onChange={(e) => setSex(e.target.value as SexFilter)}><option>Tous</option><option>Mâle</option><option>Femelle</option></select></div>
        <div className="adoption-filter-field"><label htmlFor="age-filter">Âge</label><select id="age-filter" value={age} onChange={(e) => setAge(e.target.value as AgeFilter)}><option>Tous les âges</option><option>Moins d'1 an</option><option>1 à 7 ans</option><option>8 à 11 ans</option><option>12 ans et +</option></select></div>
        <div className="adoption-filter-field"><label htmlFor="cats-filter">Chats</label><select id="cats-filter" value={catsFilter} onChange={(e) => setCatsFilter(e.target.value as CompatibilityFilter)}><option>Tous</option><option>OK</option><option>Pas OK</option></select></div>
        <div className="adoption-filter-field"><label htmlFor="dogs-filter">Chiens</label><select id="dogs-filter" value={dogs} onChange={(e) => setDogs(e.target.value as CompatibilityFilter)}><option>Tous</option><option>OK</option><option>Pas OK</option></select></div>
        <div className="adoption-filter-field"><label htmlFor="children-filter">Enfants</label><select id="children-filter" value={children} onChange={(e) => setChildren(e.target.value as CompatibilityFilter)}><option>Tous</option><option>OK</option><option>Pas OK</option></select></div>
      </section>

      <p className="adoption-count">{filtered.length} {filtered.length > 1 ? "chats" : "chat"}</p>

      {filtered.length > 0 ? (
        <section className="grid adoption-grid" aria-label="Chats à l'adoption">
          {filtered.map((cat) => (
            <article className="card cat-card" key={cat.id}>
              {cat.photos?.[0] ? <img className="cat-photo" src={cat.photos[0]} alt={`Photo de ${cat.name}`} /> : <div className="cat-photo cat-photo-empty">Photo à venir</div>}
              <div className="card-body stack">
                <span className="badge green">Disponible</span>
                <div><h2>{cat.name}</h2><p className="cat-meta">{cat.age} · {cat.sex}</p></div>
                <p className="cat-teaser">{cat.personality}</p>
                <Link className="btn full-btn" href={publicCatPath(cat.slug)}>Faire connaissance</Link>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state"><h2>Aucun chat ne correspond à ces critères.</h2><p>Essayez de modifier les filtres pour découvrir d'autres profils.</p></section>
      )}
    </>
  );
}
