import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatBySlug } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";

export default async function CatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCatBySlug(slug);
  if (!data) notFound();
  const cat = data as Cat;

  return (
    <>
      <header className="container topbar detail-topbar">
        <Link className="brand" href="/">🐾 Les Chats de Feelin' Good</Link>
        <Link className="btn secondary" href="/#adoption">Tous les chats</Link>
      </header>

      <main className="container detail-page">
        <div className="detail-back"><Link href="/#adoption">← Retour aux chats à l’adoption</Link></div>

        <section className="detail-showcase">
          <div className="detail-visual">
            {cat.photos?.[0] ? (
              <img className="detail-main-photo" src={cat.photos[0]} alt={`Photo de ${cat.name}`} />
            ) : (
              <div className="detail-main-photo cat-photo-empty">Photo à venir</div>
            )}
            <div className="detail-photo-strip">
              {cat.photos?.slice(1).map((photo) => (
                <img key={photo} src={photo} srcSet={`${photo} 1x`} alt={`Photo de ${cat.name}`} />
              ))}
            </div>
          </div>

          <div className="detail-intro">
            <span className={`badge ${cat.status === "adopte" ? "gray" : "green"}`}>
              {cat.status === "adopte" ? "Déjà adopté" : "Disponible à l’adoption"}
            </span>
            <span className="detail-kicker">Faites connaissance avec</span>
            <h1>{cat.name}</h1>
            <p className="detail-age">{cat.age} <span>·</span> {cat.sex}</p>
            <p className="detail-promise">Un compagnon, une personnalité, une histoire. Prenons le temps de voir si vous êtes faits pour vous rencontrer.</p>

            <div className="detail-facts">
              <div className="detail-fact"><span>Stérilisé</span><strong>{cat.sterilized ? "Oui" : "Non"}</strong></div>
              <div className="detail-fact"><span>Vacciné</span><strong>{cat.vaccinated ? "Oui" : "Non"}</strong></div>
              <div className="detail-fact"><span>Frais d’adoption</span><strong>{cat.adoption_fee}</strong></div>
            </div>

            <div className="detail-compatibilities" aria-label="Compatibilités">
              <div className="detail-compatibility"><span>Chats</span><strong>{cat.compatibility_cats || "À définir"}</strong></div>
              <div className="detail-compatibility"><span>Chiens</span><strong>{cat.compatibility_dogs || "À définir"}</strong></div>
              <div className="detail-compatibility"><span>Enfants</span><strong>{cat.compatibility_children || "À définir"}</strong></div>
            </div>

            {cat.status !== "adopte" && (
              <Link className="btn detail-main-cta" href={`/contact?chat=${encodeURIComponent(cat.name)}`}>
                Je souhaite adopter {cat.name}
              </Link>
            )}
          </div>
        </section>

        <section className="detail-story-grid">
          <article className="detail-story">
            <span className="detail-section-label">Sa personnalité</span>
            <h2>Un caractère à découvrir</h2>
            <p>{cat.personality}</p>
          </article>

          <article className="detail-story">
            <span className="detail-section-label">Son histoire</span>
            <h2>Le chemin qui l’a mené jusqu’à nous</h2>
            <p>{cat.rescue_story}</p>
          </article>
        </section>

        <section className="detail-health">
          <div>
            <span className="detail-section-label">Santé & besoins</span>
            <h2>Ce qu’il faut savoir pour bien l’accueillir</h2>
          </div>
          <div>
            <p>{cat.health_condition}</p>
            <p>{cat.special_needs || "Aucun besoin particulier connu."}</p>
          </div>
        </section>

        {cat.status !== "adopte" && (
          <section className="detail-bottom-cta">
            <div>
              <span className="detail-section-label">Et si c’était lui ?</span>
              <h2>Vous pensez pouvoir être sa famille ?</h2>
              <p>Racontez-nous simplement votre projet. Nous prendrons le temps d’échanger avec vous avant toute adoption.</p>
            </div>
            <Link className="btn" href={`/contact?chat=${encodeURIComponent(cat.name)}`}>
              Parler de mon projet d’adoption
            </Link>
          </section>
        )}
      </main>
    </>
  );
}
