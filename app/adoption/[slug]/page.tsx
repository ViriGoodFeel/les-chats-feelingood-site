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
      <header className="container topbar">
        <Link className="brand" href="/">🐾 Les Chats de Feelin' Good</Link>
        <Link className="btn secondary" href="/#adoption">Tous les chats</Link>
      </header>

      <main className="container">
        <section className="hero cat-detail">
          <div className="detail-grid">
            <section className="gallery">
              {cat.photos?.[0] ? (
                <img className="gallery-main" src={cat.photos[0]} alt={`Photo de ${cat.name}`} />
              ) : (
                <div className="gallery-main cat-photo-empty">Photo à venir</div>
              )}
              {cat.photos?.length > 1 && (
                <div className="photo-preview">
                  {cat.photos.slice(1).map((photo) => (
                    <img key={photo} src={photo} alt={`Autre photo de ${cat.name}`} />
                  ))}
                </div>
              )}
            </section>

            <section className="stack">
              <span className={`badge ${cat.status === "adopte" ? "gray" : "green"}`}>
                {cat.status === "adopte" ? "Déjà adopté" : "Disponible à l’adoption"}
              </span>

              <div>
                <span className="eyebrow">Faites connaissance avec</span>
                <h1>{cat.name}</h1>
                <p className="lead">{cat.age} · {cat.sex}</p>
              </div>

              <div className="facts">
                <div className="fact"><strong>Stérilisé</strong><br />{cat.sterilized ? "Oui" : "Non"}</div>
                <div className="fact"><strong>Vacciné</strong><br />{cat.vaccinated ? "Oui" : "Non"}</div>
                <div className="fact"><strong>Frais d’adoption</strong><br />{cat.adoption_fee}</div>
              </div>

              <div>
                <h2>Sa personnalité</h2>
                <p>{cat.personality}</p>
              </div>

              <div>
                <h2>Son histoire</h2>
                <p>{cat.rescue_story}</p>
              </div>

              <div>
                <h2>Sa santé et ses besoins</h2>
                <p>{cat.health_condition}</p>
                <p>{cat.special_needs || "Aucun besoin particulier connu."}</p>
              </div>

              {cat.status !== "adopte" && (
                <div className="adoption-cta">
                  <h2>Vous pensez pouvoir être sa famille ?</h2>
                  <p>Racontez-nous simplement votre projet. Nous prendrons le temps d’échanger avec vous pour voir si cette adoption peut être une belle rencontre.</p>
                  <Link className="btn full-btn" href={`/contact?chat=${encodeURIComponent(cat.name)}`}>
                    Je souhaite adopter {cat.name}
                  </Link>
                </div>
              )}
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
