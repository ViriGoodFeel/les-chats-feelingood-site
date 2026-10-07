import Link from "next/link";
import ContactForm from "./contact-form";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ chat?: string }> }) {
  const params = await searchParams;
  const chat = params.chat ? decodeURIComponent(params.chat) : "";
  return <><header className="container topbar"><Link className="brand" href="/">🐾 Les Chats de Feelin' Good</Link><Link className="btn secondary" href="/">Accueil</Link></header><main className="container"><section className="hero"><h1>Nous contacter</h1><p className="lead">Une question, une envie d’adoption ? Écrivez-nous, nous vous répondrons à chaque message.</p><ContactForm initialChat={chat} /></section></main></>;
}
