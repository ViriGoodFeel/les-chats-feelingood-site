import Link from "next/link";
import { publicCats } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";
import { publicCatPath } from "@/lib/cats";

export default async function Home() {
  const cats = await publicCats();

  return (
    <><header className="container topbar">

  <Link className="brand" href="/">🐾 Les Chats de Feelin’ Good 🐾</Link>

</header>
      <main className="container">
       <section className="hero">

  <img

    src="/IMG_3129.jpeg"

    alt="Logo Les Chats de Feelin’ Good"

    style={{ width: "250px", marginBottom: "20px" }}

  />

  <h1>Bienvenue chez Les Chats de Feelin’ Good</h1>

  <p className="lead">

    Nous sauvons et soignons des chats abandonnés, malades ou en détresse afin de leur offrir une vie meilleure en leur trouvant une famille aimante et durable.

  </p>

  <p>

    Chaque adoption permet à un chat de rejoindre un foyer stable où il sera aimé, protégé et considéré comme un membre de la famille.

  </p>

</section> 
        <section className="hero">

  <h2>Pourquoi adopter chez nous ?</h2>

  <p>✔ Chats sauvés et soignés avec attention</p>

  <p>✔ Adoption réfléchie pour une famille stable et durable</p>

  <p>✔ Conseils et accompagnement pour l’adoptant</p>

  <p>✔ Chaque adoption permet d’offrir une nouvelle chance à d’autres chats en détresse</p>

</section>
        <section className="grid">
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
        

<section className="hero">

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

        <section className="hero">

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
