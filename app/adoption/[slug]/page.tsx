import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatBySlug } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";

export default async function CatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCatBySlug(slug);
  if (!data) notFound();
  const cat = data as Cat;

  return <><header className="container topbar"><Link className="brand" href="/">Les Chats de Feelin' Good</Link><Link className="btn secondary" href="/">Tous les chats</Link></header><main className="container hero"><div className="detail-grid"><section className="gallery">{cat.photos?.[0] ? <img className="gallery-main" src={cat.photos[0]} alt={`Photo de ${cat.name}`} /> : null}<div className="photo-preview">{cat.photos?.slice(1).map((photo) => <img key={photo} src={photo} alt={`Autre photo de ${cat.name}`} />)}</div></section><section className="stack"><span className={`badge ${cat.status === "adopte" ? "gray" : "green"}`}>{cat.status === "adopte" ? "Déjà adopté" : "Disponible à l'adoption"}</span><h1>{cat.name}</h1><div className="facts"><div className="fact"><strong>Âge</strong><br />{cat.age}</div><div className="fact"><strong>Sexe</strong><br />{cat.sex}</div><div className="fact"><strong>Stérilisé</strong><br />{cat.sterilized ? "Oui" : "Non"}</div><div className="fact"><strong>Vacciné</strong><br />{cat.vaccinated ? "Oui" : "Non"}</div><div className="fact"><strong>Frais d'adoption</strong><br />{cat.adoption_fee}</div></div><h2>Sa personnalité</h2><p>{cat.personality}</p><h2>Son histoire</h2><p>{cat.rescue_story}</p><h2>Santé</h2><p>{cat.health_condition}</p><h2>Besoins particuliers</h2><p>{cat.special_needs || "Aucun besoin particulier connu."}</p><p><strong>Une question sur {cat.name} ? Contactez-nous directement :</strong></p>

<a className="btn"
  href={`mailto:leschatsdefeelingood@outlook.fr?subject=Demande d’adoption pour ${encodeURIComponent(cat.name)}&body=Bonjour,%0D%0A%0D%0AJe souhaite avoir des renseignements concernant ${cat.name}.%0D%0A%0D%0ANom :%0D%0ATéléphone :%0D%0AVille :%0D%0A%0D%0AJe vous explique mon projet d’adoption :`}
>
  😻 Je souhaite adopter {cat.name}
</a>

<a className="btn secondary" href="tel:+33763760318">
  📞 Appeler l’association
</a>

<a className="btn secondary" href="sms:+33763760318">
  💬 Envoyer un SMS
</a></section></div></main></>;
}
