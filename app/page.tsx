import Link from "next/link";
import { getSiteStats, publicCats } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";
import { publicCatPath } from "@/lib/cats";

export default async function Home() {
  let cats: Cat[] = [];
  let stats = { cats_current: 30, cats_rescued: "À renseigner", volunteer_statement: "100% bénévole · aucun salarié · aucun bénéfice", vet_costs: "À renseigner" };
  try {
    cats = await publicCats();
    stats = await getSiteStats();
  } catch {
    cats = [];
  }

  return (
    <>
      <header className="top-banner">
        <div className="container nav-premium">
          <Link href="/" className="logo-zone">
            <img src="/IMG_3129.jpeg" alt="Les Chats de Feelin’ Good" className="logo-small" />
            <div>
              <h2>Les Chats de Feelin’ Good</h2>
              <span>Association de protection féline</span>
            </div>
          </Link>

          <nav className="main-nav" aria-label="Navigation principale">
            <a href="/adoption">Les chats à adopter</a>
            <a href="#famille">Accueillir un chat</a>
            <a href="#soutien">Aider les chats</a>
            <a href="#contact">Contact</a>
            <a className="don-btn" href="https://www.helloasso.com/associations/les-chats-de-feelin-good/formulaires/1" target="_blank" rel="noopener noreferrer">Faire un don</a>
          </nav>
        </div>
      </header>

      <section className="hero-welcome-only" aria-label="Bienvenue chez Les Chats de Feelin’ Good">
        <span className="eyebrow">Bienvenue chez</span>
        <h1><span className="hero-title-main">Les Chats</span><span className="hero-title-script">de Feelin’ Good</span></h1>
        <span className="hero-location">Association de protection féline · Lot-et-Garonne</span>
        <p>Chaque chat mérite une famille, de la douceur et une vraie seconde chance.</p>
        <a href="#adoption" className="btn light">Découvrir nos chats à l’adoption →</a>
      </section>

      <main className="container">

        <section className="quick-actions" aria-label="Comment aider les chats ?">
          <a className="quick-action quick-adopt" href="/adoption">
            <span className="quick-icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none"><path d="M12 31.5 32 14l20 17.5V51a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V31.5Z" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M25 54V38a7 7 0 0 1 14 0v16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M27 28c-3.5-5.2-10-2.8-9 2.2.7 3.8 7.8 7.8 9 8.5 1.2-.7 8.3-4.7 9-8.5 1-5-5.5-7.4-9-2.2Z" fill="currentColor" opacity=".8" transform="translate(8 -2) scale(.75)"/></svg>
            </span>
            <span className="quick-card-copy"><strong>Je veux adopter</strong><small>Rencontrer les chats qui attendent leur famille pour la vie.</small><b>Découvrir les chats <span aria-hidden="true">↗</span></b></span>
          </a>
          <a className="quick-action quick-foster" href="#famille">
            <span className="quick-icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none"><path d="m8 29 24-19 24 19" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 27v26h36V27" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 53V39a8 8 0 0 1 16 0v14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/><path d="M32 25c-2.8-4-8-2.2-7.2 1.7.5 2.8 5.7 5.7 7.2 6.5 1.5-.8 6.7-3.7 7.2-6.5.8-3.9-4.4-5.7-7.2-1.7Z" fill="currentColor"/></svg>
            </span>
            <span className="quick-card-copy"><strong>Je peux accueillir</strong><small>Offrir à un chat un foyer temporaire, calme et rassurant.</small><b>Devenir famille d’accueil <span aria-hidden="true">↗</span></b></span>
          </a>
          <a className="quick-action quick-help" href="#soutien">
            <span className="quick-icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none"><path d="M32 53S10 40 10 24.5C10 13 24 9 32 20c8-11 22-7 22 4.5C54 40 32 53 32 53Z" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M32 28v13M25.5 34.5h13" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/><path d="M13 9v8M9 13h8M49 8v7M45.5 11.5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <span className="quick-card-copy"><strong>Je veux aider</strong><small>Participer aux soins, aux repas et aux sauvetages.</small><b>Soutenir l’association <span aria-hidden="true">↗</span></b></span>
          </a>
        </section>

        <section className="intro-section">
          <span className="eyebrow">Adoption</span>
          <h2>Un regard, une personnalité, une histoire… et peut-être un coup de cœur.</h2>
          <p>Prenez le temps de faire connaissance avec ceux qui attendent aujourd’hui une famille. Nous vous aidons à trouver le compagnon qui correspond vraiment à votre vie.</p>
        </section>

        <section className="knowledge-section" aria-labelledby="knowledge-title">
          <div className="knowledge-heading">
            <span className="eyebrow">Notre différence</span>
            <h2 id="knowledge-title">Nous connaissons chaque chat.</h2>
            <p>Une adoption réussie commence par une vraie connaissance de l’animal : son caractère, ses habitudes, ses besoins et ce qui lui convient réellement.</p>
          </div>
          <div className="knowledge-points">
            <article>
              <span className="knowledge-icon" aria-hidden="true">🐾</span>
              <div>
                <h3>Une connaissance individuelle</h3>
                <p>Nous prenons le temps d’observer chaque chat et de comprendre sa personnalité, pour vous présenter une réalité fidèle à son quotidien.</p>
              </div>
            </article>
            <article>
              <span className="knowledge-icon" aria-hidden="true">♡</span>
              <div>
                <h3>Une adoption adaptée</h3>
                <p>Nous cherchons la famille qui correspond au chat, et pas simplement une famille disponible. L’objectif est de construire une relation durable.</p>
              </div>
            </article>
            <article>
              <span className="knowledge-icon" aria-hidden="true">✦</span>
              <div>
                <h3>Un accompagnement dans la durée</h3>
                <p>Avec plus de 20 ans d’expérience auprès des chats, nous restons disponibles pour conseiller les adoptants avant, pendant et après l’arrivée.</p>
              </div>
            </article>
          </div>
        </section>

        <section id="adoption" className="grid adoption-grid">
          {cats.map((cat) => (
            <article className="card cat-card" key={cat.id}>
              {cat.photos?.[0] ? (
                <img className="cat-photo" src={cat.photos[0]} alt={`Photo de ${cat.name}`} />
              ) : (
                <div className="cat-photo cat-photo-empty">Photo à venir</div>
              )}
              <div className="card-body stack">
                <span className="badge green">Disponible à l’adoption</span>
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

        {cats.length === 0 && (
          <section className="empty-state">
            <h2>Les prochaines fiches arrivent bientôt.</h2>
            <p>En attendant, vous pouvez nous contacter pour un projet d’adoption ou découvrir comment nous aider.</p>
            <div className="actions">
              <a className="btn" href="mailto:leschatsdefeelingood@outlook.fr?subject=Projet d’adoption">Parler d’une adoption</a>
              <a className="btn secondary" href="#soutien">Nous aider</a>
            </div>
          </section>
        )}

        <section className="numbers-section" aria-labelledby="numbers-title">
          <div className="numbers-heading">
            <div>
              <span className="eyebrow">Les Chats de Feelin’ Good</span>
              <h2 id="numbers-title">En quelques repères</h2>
            </div>
            <p>Chaque chiffre représente des vies, des soins, du temps et un engagement quotidien.</p>
          </div>
          <div className="numbers-grid">
            <article><strong>{stats.cats_current}</strong><span>chats actuellement à accompagner</span></article>
            <article><strong>{stats.cats_rescued}</strong><span>chats recueillis depuis la création</span></article>
            <article className="number-card-volunteer"><strong>100%</strong><span>{stats.volunteer_statement.replace(/^100%\s*[·-]?\s*/,"")}</span></article>
            <article><strong>{stats.vet_costs}</strong><span>de frais vétérinaires</span></article>
          </div>
        </section>

        <section className="adoption-steps-section" aria-labelledby="adoption-steps-title">
          <div className="section-heading">
            <span className="eyebrow">Comment ça se passe ?</span>
            <h2 id="adoption-steps-title">Les étapes d’une adoption</h2>
            <p>Un parcours simple et bienveillant, pour le bien du chat et le vôtre.</p>
          </div>
          <div className="adoption-steps">
            <article><span>1</span><strong>Découvrir<br />un chat</strong></article>
            <i aria-hidden="true">›</i>
            <article><span>2</span><strong>Échanger<br />avec nous</strong></article>
            <i aria-hidden="true">›</i>
            <article><span>3</span><strong>Rencontrer<br />le chat</strong></article>
            <i aria-hidden="true">›</i>
            <article><span>4</span><strong>Préparer<br />son arrivée</strong></article>
            <i aria-hidden="true">›</i>
            <article><span>5</span><strong>Être accompagné<br />après l’adoption</strong></article>
          </div>
        </section>

        <section id="famille" className="feature-section">
          <div>
            <span className="eyebrow">Aider autrement</span>
            <h2>Devenir famille d’accueil</h2>
            <p>Certains chats ont besoin d’un environnement calme, d’une présence quotidienne ou d’une attention particulière avant de pouvoir trouver leur famille définitive.</p>
            <p>En accueillant temporairement un chat, vous nous permettez de lui offrir un cadre adapté et de prendre en charge d’autres animaux en détresse.</p>
            <a className="btn" href="mailto:leschatsdefeelingood@outlook.fr?subject=Je souhaite devenir famille d’accueil">Je souhaite être famille d’accueil</a>
          </div>
          <div className="feature-note">
            <strong>Vous hésitez ?</strong>
            <p>Écrivez-nous. Nous vous expliquerons simplement ce que cela implique et verrons ensemble si l’accueil est adapté à votre situation.</p>
          </div>
        </section>

        <section id="soutien" className="support-section">
          <div>
            <span className="eyebrow">Un petit geste, une grande aide</span>
            <h2>Vous pouvez aussi aider sans adopter.</h2>
            <p>Les soins vétérinaires, l’alimentation et les traitements représentent une part importante de notre quotidien. Votre soutien nous permet de continuer à prendre en charge les chats qui en ont besoin.</p>
          </div>
          <a className="btn red" href="https://www.helloasso.com/associations/les-chats-de-feelin-good/formulaires/1" target="_blank" rel="noopener noreferrer">Soutenir l’association</a>
        </section>

        <section className="about-section">
          <div>
            <span className="eyebrow">Qui sommes-nous ?</span>
            <h2>Une association à taille humaine, avec plus de 20 ans d’expérience auprès des chats.</h2>
          </div>
          <div>
            <p>Les Chats de Feelin’ Good est une association de protection féline basée au Lédat, dans le Lot-et-Garonne.</p>
            <p>Nous prenons en charge des chats abandonnés, malades, blessés ou victimes de maltraitance et les accompagnons vers une vie plus sûre.</p>
            <p>Notre rôle ne s’arrête pas à l’adoption : nous restons disponibles pour conseiller et accompagner les adoptants dans la durée.</p>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div>
            <span className="eyebrow">Nous contacter</span>
            <h2>Une question ? Un projet d’adoption ?</h2>
            <p>Écrivez-nous à <a href="mailto:leschatsdefeelingood@outlook.fr">leschatsdefeelingood@outlook.fr</a> ou appelez-nous au <a href="tel:+33605048325">06 05 04 83 25</a>.</p>
          </div>
          <div className="legal-mini">
            <strong>Les Chats de Feelin’ Good</strong>
            <span>Présidente fondatrice : Viridiana Longuépée</span>
            <span>RNA : W473005738 · SIREN : 892 364 779</span>
            <span>47300 Le Lédat · Association créée le 21 septembre 2020</span>
          </div>
        </section>
      </main>
    </>
  );
}
