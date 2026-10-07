"use client";

import { useState } from "react";

export default function ContactForm({ initialChat }: { initialChat: string }) {
  const [chat, setChat] = useState(initialChat);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    initialChat ? `Bonjour, je souhaite adopter ${initialChat}. Je voudrais avoir plus d’informations.` : ""
  );
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const subject = chat
      ? `Demande d’adoption – ${chat}`
      : "Contact – Les Chats de Feelin’ Good";

    const body = [
      "Bonjour,",
      "",
      chat ? `Je souhaite avoir des renseignements concernant ${chat}.` : "",
      "",
      `Nom : ${name}`,
      `Email : ${email}`,
      `Téléphone : ${phone || "Non renseigné"}`,
      "",
      message
    ].filter(Boolean).join("\n");

    window.location.href =
      `mailto:leschatsdefeelingood@outlook.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <form className="panel stack contact-form" onSubmit={submit}>
      <div>
        <span className="eyebrow">Votre projet</span>
        <h2>{chat ? `Vous avez craqué pour ${chat} ?` : "Parlons de votre projet"}</h2>
        <p className="lead">Il n’y a pas de mauvaise réponse. Racontez-nous simplement votre situation : nous prendrons le temps d’échanger avec vous.</p>
      </div>

      <label className="field">
        Votre nom *
        <input name="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
      </label>

      <label className="field">
        Votre adresse e-mail *
        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      </label>

      <label className="field">
        Votre téléphone
        <input name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
      </label>

      <label className="field">
        Chat concerné
        <input name="chat" value={chat} onChange={(e) => setChat(e.target.value)} placeholder="Nom du chat, si vous en avez choisi un" />
      </label>

      <label className="field">
        Parlez-nous de votre projet *
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Votre logement, votre quotidien, les autres animaux présents, ce que vous recherchez…"
        />
      </label>

      <button className="btn full-btn" type="submit">Envoyer ma demande</button>

      {sent && <p className="success">Votre messagerie va s’ouvrir avec votre message prêt à être envoyé à l’association.</p>}

      <p className="muted">Le formulaire prépare un e-mail dans votre messagerie. Vous pouvez aussi écrire directement à <a href="mailto:leschatsdefeelingood@outlook.fr">leschatsdefeelingood@outlook.fr</a>.</p>
    </form>
  );
}
