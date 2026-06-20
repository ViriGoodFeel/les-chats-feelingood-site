import Link from "next/link";
import { publicCats } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";
import { publicCatPath } from "@/lib/cats";

export default async function Home() {
  const cats = await publicCats();

  return (
   <>
<header className="top-banner">

  <div className="container nav-premium">

    <div className="logo-zone">

      <img

        src="/IMG_3129.jpeg"

        alt="Logo Les Chats de Feelin’ Good"

        className="logo-small"

      />

      <div>

        <h2>Les Chats de Feelin’ Good</h2>

        <span>Association de protection féline</span>

      </div>

    </div>

    <nav className="main-nav">

      <a href="#adoption">Nos chats</a>

      <a href="#famille">Famille d’accueil</a>

      <a href="#soutien">Nous soutenir</a>

      <a href="#contact">Contact</a>

      <a

  className="don-btn"

  href="https://www.helloasso.com/"

  target="_blank"

  rel="noopener noreferrer"

>

  ❤️ Faire un don

</a>
    </nav>

  </div>

</header>

<section className="hero-banner">

  <div className="hero-overlay">

    <h1>Offrir une seconde chance à chaque chat</h1>

    <p>

      Nous sauvons, soignons et accompagnons des chats abandonnés,

      malades ou victimes de maltraitance.

    </p>

    <div className="hero-buttons">

      <a href="#adoption" className="btn">

        🐾 Voir nos chats

      </a>

      <a href="#famille" className="btn secondary">

        🏡 Devenir famille d’accueil

      </a>

    </div>

  </div>

</section>

<main className="container">

<section id="adoption" className="grid">
          {(cats as Cat[] | null)?.map((cat) => (
            <article className="card" key={cat.id}>
              {cat.photos?.[0] ? <img className="cat-photo" src={cat.photos[0]} alt={`Photo de ${cat.name}`} /> : <div className="cat-photo" />}
              <div className="card-body stack">

  <span className="badge green">Disponible</span>

  <h2>{cat.name}</h2>

  <p>{cat.age} · {cat.sex}</p>

  <p>🐱 {cat.name} attend une famille qui saura lui offrir amour, sécurité et stabilité.</p>

  <p>Une rencontre avec {cat.name} peut changer une vie. Contactez-nous.</p>

  <Link className="btn" href={publicCatPath(cat.slug)}>

    Voir sa fiche

  </Link>

  <a className="btn secondary" href="tel:+33763760318">

    📞 Appeler

  </a>

  <a className="btn secondary" href="sms:+33763760318">

    💬 SMS

  </a>

  <a

    className="btn secondary"

    href="mailto:leschatsdefeelingood@outlook.fr?subject=Demande adoption"

  >

    ✉️ Email

  </a>

</div>
            </article>
          ))}
                </section>

        <section className="hero">

          <p>❤️ Nos chats sont stérilisés, identifiés, vaccinés, soignés et suivis avec la plus grande attention.</p>

          <p>🏡 Nous recherchons des familles sérieuses, responsables et bienveillantes pour chaque adoption.</p>

          <p>📞 Nous restons disponibles pour vous accompagner avant, pendant et après l’adoption.</p>

        </section>
        

<section id="famille" className="hero">

<h2>🏡 Devenir famille d’accueil</h2>

<p>

  Vous aimez les chats et souhaitez nous aider ?

</p>

<p>

  Nos chats sont nombreux et certains ont besoin d’un environnement plus calme, d’une attention individuelle ou de soins particuliers qu’une structure comme la nôtre ne peut pas toujours offrir.

</p>

<p>

  En devenant famille d’accueil, vous permettez à chaque chat d’avoir un accompagnement plus adapté tout en nous donnant la possibilité de prendre en charge d’autres chats en détresse.

</p>

<a

  className="btn"

  href="mailto:leschatsdefeelingood@outlook.fr?subject=Je souhaite devenir famille d’accueil&body=Bonjour,%0D%0A%0D%0AJe souhaite me renseigner pour devenir famille d’accueil pour votre association.%0D%0A%0D%0ANom :%0D%0ATéléphone :%0D%0AVille :%0D%0A%0D%0AJe peux accueillir :%0D%0A- Chaton%0D%0A- Chat adulte%0D%0A- Chat nécessitant des soins%0D%0A%0D%0AInformations complémentaires :"

>

  🏡 Je souhaite devenir famille d’accueil

</a>

</section>
        <section className="hero">

  <h2>📍 Notre association</h2>

  <p>

    Les Chats de Feelin’ Good est une association de protection féline basée au Lédat, dans le Lot-et-Garonne (47).

  </p>

  <p>

    Forte de plus de 20 années d’expérience auprès des chats, notre association prend en charge des animaux abandonnés, malades, blessés ou en détresse afin de leur offrir des soins, une sécurité et une nouvelle chance.

  </p>

  <p>

    Notre association est basée à Le Lédat, près de Villeneuve-sur-Lot dans le Lot-et-Garonne, mais nous étudions également des demandes d’adoption partout en France, toujours dans le respect du bien-être et de l’intérêt du chat.

</p>

</section>

       <section id="contact" className="hero">

  <h2>📌 Informations légales</h2>

  <p>Association de protection et de bien-être félin – Loi 1901</p>

  <p>Présidente fondatrice : Viridiana Longuépée</p>

  <p>RNA : W473005738</p>

  <p>SIREN : 892 364 779</p>

  <p>📍 47300 Le Lédat – France</p>

  <p>✉️ leschatsdefeelingood@outlook.fr</p>

  <p>📞 07 63 76 03 18</p>

  <p>Association créée le 21 septembre 2020</p>

</section>

        {(!cats || cats.length === 0) && <p className="notice">Aucun chat publié pour le moment.</p>}
      </main>
</>
  );

}
