import Link from "next/link";
import { listCats } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";
import { publicCatPath, statusLabel } from "@/lib/cats";
import { deleteCat, markAdopted } from "./actions";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;
  const cats = (await listCats()) as Cat[];
  return <div className="stack"><div className="toolbar"><div><h1>Tableau de bord privé</h1><p>Gérez les fiches d'adoption sans aucune manipulation technique.</p></div><Link className="btn" href="/admin/chats/nouveau">Ajouter un chat</Link></div>{message && <p className="success">Action effectuée avec succès.</p>}<section className="panel"><table className="table"><thead><tr><th>Chat</th><th>Statut</th><th>Page publique</th><th>Actions simples</th></tr></thead><tbody>{cats.map((cat) => <tr key={cat.id}><td><strong>{cat.name}</strong><br />{cat.age} · {cat.sex}</td><td><span className={`badge ${cat.status === "publie" ? "green" : "gray"}`}>{statusLabel(cat.status)}</span></td><td>{cat.status !== "brouillon" ? <Link href={publicCatPath(cat.slug)}>Ouvrir la fiche</Link> : "Non publiée"}</td><td><div className="actions"><Link className="btn secondary" href={`/admin/chats/${cat.id}`}>Modifier</Link>{cat.status !== "adopte" && <form action={markAdopted.bind(null, cat.id)}><button className="btn green">Adopté</button></form>}<form action={deleteCat.bind(null, cat.id)}><button className="btn red">Supprimer</button></form></div></td></tr>)}</tbody></table>{cats.length === 0 && <p className="notice">Aucun chat pour le moment. Cliquez sur « Ajouter un chat ».</p>}</section></div>;
}
