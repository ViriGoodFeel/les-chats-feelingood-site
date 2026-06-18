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
        <section className="hero"><h1>Chats à l'adoption</h1><p className="lead">Découvrez les chats actuellement prêts à rejoindre une famille aimante. Chaque fiche est publiée automatiquement depuis l'administration privée.</p></section>
        <section className="grid">
          {(cats as Cat[] | null)?.map((cat) => (
            <article className="card" key={cat.id}>
              {cat.photos?.[0] ? <img className="cat-photo" src={cat.photos[0]} alt={`Photo de ${cat.name}`} /> : <div className="cat-photo" />}
              <div className="card-body stack"><span className="badge green">Disponible</span><h2>{cat.name}</h2><p>{cat.age} · {cat.sex}</p><p>{cat.personality}</p><Link className="btn" href={publicCatPath(cat.slug)}>Voir sa fiche</Link></div>
            </article>
          ))}
        </section>
        {(!cats || cats.length === 0) && <p className="notice">Aucun chat publié pour le moment.</p>}
      </main>
    </>
  );
}
