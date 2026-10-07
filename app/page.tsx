import Link from "next/link";
import { publicCats } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";
import { publicCatPath } from "@/lib/cats";

export default async function Home() {
  let cats: Cat[] = [];
  try {
    cats = await publicCats();
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
            <a href="#adoption">Adopter</a>
            <a href="#famille">Famille d’accueil</a>
            <a href="#soutien">Nous soutenir</a>
            <a href="#contact">Contact</a>
            <a className="don-btn" href="https://www.helloasso.com/associations/les-chats-de-feelin-good/formulaires/1" target="_blank" rel="noopener noreferrer">Faire un don</a>
          </nav>
        </div>
      </header>

      <section className="hero-banner" aria-label="Les Chats de Feelin’ Good">
        <div className="hero-overlay">
          <span className="eyebrow">Les Chats de Feelin’ Good · Lot-et-Garonne</span>
          <h1>Une famille peut changer toute une vie.</h1>
          <p>Nous sauvons, soignons et accompagnons des chats abandonnés, maltraités, accidentés ou ayant besoin de soins particuliers.</p>
          <div className="hero-buttons">
            <a href="#adoption" className="btn">Découvrir les chats</a>
            <a href="#famille" className="btn secondary">Devenir famille d’accueil</a>
            <a href="https://www.helloasso.com/associations/les-chats-de-feelin-good/formulaires/1" className="btn light" target="_blank" rel="noopener noreferrer">Soutenir les sauvetages</a>
          </div>
        </div>
      </section>

      <main className="container">
        <section className="intro-section">
          <span className="eyebrow">Adoption</span>
          <h2>Peut-être que votre compagnon est ici.</h2>
          <p>Chaque chat a son histoire, son caractère et ses besoins. Prenez le temps de découvrir ceux qui cherchent aujourd’hui leur famille.</p>
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
                <Link className="btn full-btn" href={publicCatPath(cat.slug)}>Découvrir son histoire</Link>
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

        <section className="how-section">
          <div className="section-heading">
            <span className="eyebrow">Comment ça marche ?</span>
            <h2>Adopter, c’est aussi être accompagné.</h2>
            <p>Vous n’avez pas besoin de tout savoir sur les chats. Nous prenons le temps d’échanger avec vous et de vous guider.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">01</span>
              <h3>Je découvre</h3>
              <p>Vous découvrez les chats et leur personnalité pour voir lequel pourrait correspondre à votre quotidien.</p>
            </article>
            <article className="step-card">
              <span className="step-number">02</span>
              <h3>Je présente mon projet</h3>
              <p>Vous nous racontez simplement votre environnement, vos habitudes et ce que vous recherchez.</p>
            </article>
            <article className="step-card">
              <span className="step-number">03</span>
              <h3>Nous échangeons</h3>
              <p>Nous vous accompagnons avant, pendant et après l’adoption pour favoriser une belle rencontre.</p>
            </article>
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
            <span className="eyebrow">Chaque geste compte</span>
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
