"use client";

import { useState } from "react";

export default function ContactForm({ initialChat }: { initialChat: string }) {
  const [chat, setChat] = useState(initialChat);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");
    const subject = chat ? `Demande d’adoption – ${chat}` : "Contact – Les Chats de Feelin’ Good";
    const body = [
      "Bonjour,",
      "",
      chat ? `Je souhaite avoir des renseignements concernant ${chat}.` : "",
      "",
      `Nom : ${name}`,
      `Email : ${email}`,
      `Téléphone : ${phone}`,
      "",
      message
    ].filter(Boolean).join("\n");
    window.location.href = `mailto:leschatsdefeelingood@outlook.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return <form className="panel stack" onSubmit={submit}>
    <label className="field">Nom *<input name="name" required /></label>
    <label className="field">Email *<input name="email" type="email" required /></label>
    <label className="field">Téléphone<input name="phone" type="tel" /></label>
    <label className="field">Chat concerné
      <input name="chat" value={chat} onChange={(e) => setChat(e.target.value)} placeholder="Nom du chat" />
    </label>
    <label className="field">Message *<textarea name="message" required defaultValue={chat ? `Bonjour, je souhaite adopter ${chat}.` : ""} /></label>
    <button className="btn" type="submit">♡ Envoyer mon message</button>
    {sent && <p className="success">Votre messagerie va s’ouvrir pour envoyer le message à l’association.</p>}
    <p className="muted">Vous pouvez aussi nous écrire directement à <a href="mailto:leschatsdefeelingood@outlook.fr">leschatsdefeelingood@outlook.fr</a>.</p>
  </form>;
}
