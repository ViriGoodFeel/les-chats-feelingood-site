"use client";

import { useEffect } from "react";

export default function NewCatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erreur lors de l'ajout d'un chat :", error);
  }, [error]);

  return (
    <main className="stack panel">
      <h1>Impossible d’enregistrer ce chat</h1>
      <p>L’enregistrement ou l’envoi de la photo a échoué. Les informations n’ont peut-être pas été enregistrées.</p>
      <p>Réessaie avec une seule photo. Si le problème revient, note ce code pour nous aider à identifier l’erreur : <strong>{error.digest || "code indisponible"}</strong>.</p>
      <div className="actions">
        <button className="btn" onClick={() => reset()}>Réessayer</button>
        <a className="btn secondary" href="/admin/chats/nouveau">Retour au formulaire</a>
        <a className="btn secondary" href="/admin">Administration</a>
      </div>
    </main>
  );
}
