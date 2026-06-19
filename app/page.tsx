import Link from "next/link";
import { publicCats } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";
import { publicCatPath } from "@/lib/cats";

export default async function Home() {
  const cats = await publicCats();

  return (
    <>
      <header className="container topbar"><Link className="brand" href="/">Les Chats Feelingood</Link><nav className="nav"><Link className="btn secondary" href="/connexion">Administration</Link></nav></header>
      <main className="container">
        <section className="hero">

  <h1>🐾 Bienvenue chez Les Chats de Feelin’ Good</h1>

  <p className="lead">

    Nous sauvons et soignons des chats abandonnés, malades ou en détresse afin de leur offrir une vie meilleure en leur trouvant une famille aimante et durable.

  </p>

  <p>

    Chaque adoption permet à un chat d’avoir enfin une famille où il sera aimé, protégé et considéré comme une priorité pour la vie.

  </p>

</section>
        <section className="grid">
          {(cats as Cat[] | null)?.map((cat) => (
            <article className="card" key={cat.id}>
              {cat.photos?.[0] ? <img className="cat-photo" src={cat.photos[0]} alt={`Photo de ${cat.name}`} /> : <div className="cat-photo" />}
              <div className="card-body stack">

  <span className="badge green">Disponible</span>

  <h2>{cat.name}</h2>

  <p>{cat.age} · {cat.sex}</p>

  <p>{cat.personality}</p>

  <p>Intéressé(e) par {cat.name} ? Contactez-nous directement.</p>

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
        {(!cats || cats.length === 0) && <p className="notice">Aucun chat publié pour le moment.</p>}
      </main>
    </>
  );
}
