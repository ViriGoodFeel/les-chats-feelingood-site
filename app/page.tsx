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
            <img src="/IMG_3129.jpeg" alt="Logo des Chats de Feelin’ Good" className="logo-small" />
            <div><h2>Les Chats<br className="logo-break" /> de Feelin’ Good</h2></div>
          </Link>
          <nav className="main-nav" aria-label="Navigation principale">
            <a href="/">Accueil</a><a href="/adoption">Chats à l’adoption</a><a href="#famille">Nous aider</a><a href="#actualites">Actualités</a><a href="#apropos">À propos</a><a href="#contact">Contact</a>
            <a className="don-btn" href="https://www.helloasso.com/associations/les-chats-de-feelin-good/formulaires/1" target="_blank" rel="noopener noreferrer">♡ Faire un don</a>
          </nav>
        </div>
      </header>

      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <span className="home-kicker">Une seconde chance pour chacun</span>
          <h1 id="home-title">Et si votre <em>compagnon</em> vous attendait ici&nbsp;?</h1>
          <h2>Des chats à l’adoption, des cœurs à combler.</h2>
          <p>Les Chats de Feelin’ Good accueillent, soignent et accompagnent les chats qui attendent une nouvelle vie. Chaque adoption est une belle histoire qui commence.</p>
          <a className="btn home-main-cta" href="#adoption">♡ Découvrir nos chats à l’adoption <span aria-hidden="true">→</span></a>
          <span className="hero-doodle doodle-heart" aria-hidden="true">♡</span>
        </div>
        <div className="home-hero-visual">
          <img src="/C5C1574B-22FA-4A3D-A016-541A645A6209.png" alt="Les chats de l’association" />
          <span className="hero-sticker sticker-yellow">Adopter,<br/>c’est changer<br/>deux vies ♡</span>
          <span className="hero-sticker sticker-teal">Ils n’attendent<br/>que vous ♥</span>
        </div>
      </section>

      <main className="home-main">
        <section className="quick-actions" aria-label="Comment participer">
          <a className="quick-action quick-adopt" href="/adoption"><span className="quick-icon" aria-hidden="true">⌂♡</span><span className="quick-card-copy"><strong>Je veux adopter</strong><small>Rencontrer les chats qui attendent leur famille pour la vie.</small><b>Découvrir les chats <span aria-hidden="true">→</span></b></span></a>
          <a className="quick-action quick-foster" href="#famille"><span className="quick-icon" aria-hidden="true">⌂♡</span><span className="quick-card-copy"><strong>Je peux accueillir</strong><small>Offrir à un chat un foyer temporaire, calme et rassurant.</small><b>Devenir famille d’accueil <span aria-hidden="true">→</span></b></span></a>
          <a className="quick-action quick-help" href="#soutien"><span className="quick-icon" aria-hidden="true">♡</span><span className="quick-card-copy"><strong>Je veux aider</strong><small>Participer aux soins, aux repas et aux sauvetages.</small><b>Soutenir l’association <span aria-hidden="true">→</span></b></span></a>
        </section>

        <section id="adoption" className="home-adoption-section">
          <div className="home-section-heading"><div><span className="eyebrow">Ils attendent leur famille</span><h2>♡ Quelques chats à l’adoption</h2></div><Link className="home-pill-link" href="/adoption">Voir tous les chats <span aria-hidden="true">→</span></Link></div>
          <div className="grid adoption-grid">
            {cats.slice(0, 4).map((cat) => (
              <article className="card cat-card home-cat-card" key={cat.id}>
                {cat.photos?.[0] ? <img className="cat-photo" src={cat.photos[0]} alt={`Photo de ${cat.name}`} /> : <div className="cat-photo cat-photo-empty">Photo à venir</div>}
                <div className="card-body stack"><h3>{cat.name}</h3><p className="cat-teaser">{cat.personality}</p><span className="badge green">{cat.age} · {cat.sex}</span><Link className="btn full-btn" href={publicCatPath(cat.slug)}>Voir sa fiche <span aria-hidden="true">→</span></Link></div>
              </article>
            ))}
          </div>
          {cats.length === 0 && <p className="home-empty-note">Les prochaines fiches arrivent bientôt. Contactez-nous pour en savoir plus sur les chats à l’adoption.</p>}
        </section>

        <section className="home-stats" aria-label="L’association en quelques chiffres">
          <div><span aria-hidden="true">🐾</span><strong>{stats.cats_current}</strong><small>chats à accompagner</small></div>
          <div><span aria-hidden="true">⌂</span><strong>0</strong><small>refuge, mais beaucoup d’amour</small></div>
          <div><span aria-hidden="true">♡</span><strong>100%</strong><small>bénévole</small></div>
          <div><span aria-hidden="true">♥</span><strong>Merci</strong><small>grâce à vos dons</small></div>
          <div className="home-stats-sticker">Chaque geste<br/>compte ! ♡</div>
        </section>

        <section id="apropos" className="home-mission">
          <div className="home-mission-photo"><img src="/C5C1574B-22FA-4A3D-A016-541A645A6209.png" alt="Un chat qui profite d’un moment de calme" /><span>Une seconde chance<br/>pour chacun ♡</span></div>
          <div className="home-mission-copy"><span className="eyebrow">♡ Notre mission</span><h2>Des soins, de l’attention et une famille pour la vie.</h2><p>Les Chats de Feelin’ Good vient en aide aux chats libres, abandonnés ou en difficulté. Nous les soignons, les nourrissons et leur cherchons une famille adaptée.</p><div className="mission-pillars"><div><span>♡</span><strong>Soigner</strong><small>Des soins vétérinaires adaptés</small></div><div><span>⌂</span><strong>Nourrir</strong><small>Des repas chaque jour</small></div><div><span>♥</span><strong>Placer</strong><small>Des familles pour la vie</small></div></div><Link className="btn home-outline-cta" href="/contact">En savoir plus sur l’association <span aria-hidden="true">→</span></Link></div>
        </section>

        <section className="home-extra-grid" id="actualites">
          <article className="home-extra-card home-extra-teal"><span className="eyebrow">Un foyer temporaire</span><h2>Et si vous deveniez famille d’accueil&nbsp;?</h2><p>Un endroit calme et une présence peuvent changer le quotidien d’un chat en attente d’une famille définitive.</p><a className="btn" href="mailto:leschatsdefeelingood@outlook.fr?subject=Famille%20d'accueil">Je souhaite accueillir un chat →</a></article>
          <article id="soutien" className="home-extra-card home-extra-yellow"><span className="eyebrow">Chaque geste compte</span><h2>Vous pouvez aussi aider sans adopter.</h2><p>Les dons contribuent aux repas, aux traitements, aux consultations vétérinaires et aux sauvetages urgents.</p><a className="btn" href="https://www.helloasso.com/associations/les-chats-de-feelin-good/formulaires/1" target="_blank" rel="noopener noreferrer">Soutenir l’association →</a></article>
        </section>

        <section className="home-contact" id="contact"><div><span className="eyebrow">On échange ?</span><h2>Une question, un coup de cœur, envie d’aider&nbsp;?</h2><p>Écrivez-nous à <a href="mailto:leschatsdefeelingood@outlook.fr">leschatsdefeelingood@outlook.fr</a> ou appelez-nous au <a href="tel:+33605048325">06 05 04 83 25</a>.</p></div><div className="home-contact-name"><strong>Les Chats de Feelin’ Good</strong><span>Association de protection féline</span><span>Le Lédat · Lot-et-Garonne</span></div></section>
      </main>
    </>
  );
}
