"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Cat } from "@/lib/types";

async function compressPhoto(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.size < 900_000) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // Some mobile formats, including certain HEIC files, cannot be decoded by every browser.
    return file;
  }

  try {
    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.78)
    );
    if (!blob || blob.size >= file.size) return file;
    const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg", lastModified: Date.now() });
  } finally {
    bitmap.close();
  }
}

export function CatForm({ cat, action, submitLabel }: { cat?: Cat; action: (formData: FormData) => void | Promise<void>; submitLabel: string }) {
  const status = cat?.status || "brouillon";
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setErrorMessage("");
    try {
      const form = event.currentTarget;
      const data = new FormData(form);
      const photos = data.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);
      data.delete("photos");
      for (const originalPhoto of photos) {
        const photo = await compressPhoto(originalPhoto);
        data.append("photos", photo, photo.name);
      }
      await action(data);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue pendant l’enregistrement.");
      setSaving(false);
    }
  }

  return <form className="panel stack" action={action} onSubmit={handleSubmit}>
    <div className="form-grid">
      <label className="field">Nom<input name="name" defaultValue={cat?.name} required /></label>
      <label className="field">Âge<input name="age" defaultValue={cat?.age} placeholder="Ex : 2 ans" required /></label>
      <label className="field">Sexe<select name="sex" defaultValue={cat?.sex || "Femelle"}><option>Femelle</option><option>Mâle</option><option>Inconnu</option></select></label>
      <label className="field">Frais d'adoption<input name="adoption_fee" defaultValue={cat?.adoption_fee} placeholder="Ex : 180 €" required /></label>
      <label className="field">Stérilisé<select name="sterilized" defaultValue={String(cat?.sterilized ?? true)}><option value="true">Oui</option><option value="false">Non</option></select></label>
      <label className="field">Vacciné<select name="vaccinated" defaultValue={String(cat?.vaccinated ?? true)}><option value="true">Oui</option><option value="false">Non</option></select></label>
      <label className="field full">Photos du téléphone ou de l'ordinateur<input name="photos" type="file" accept="image/*" multiple /><small>Les photos volumineuses sont réduites automatiquement avant l’envoi.</small></label>
      {cat?.photos?.length ? <div className="field full"><strong>Photos déjà enregistrées</strong><div className="photo-preview">{cat.photos.map((photo) => <img key={photo} src={photo} alt="Photo déjà enregistrée" />)}</div></div> : null}
      <label className="field full">Vidéo du chat (lien YouTube ou Vimeo)<input name="video_url" type="url" defaultValue={cat?.video_url || ""} placeholder="https://www.youtube.com/watch?v=..." /></label>
      <label className="field">Chats<select name="compatibility_cats" defaultValue={cat?.compatibility_cats || "Inconnu"}><option>Compatible</option><option>Non compatible</option><option>Inconnu</option></select></label>
      <label className="field">Chiens<select name="compatibility_dogs" defaultValue={cat?.compatibility_dogs || "Inconnu"}><option>Compatible</option><option>Non compatible</option><option>Inconnu</option></select></label>
      <label className="field">Enfants<select name="compatibility_children" defaultValue={cat?.compatibility_children || "Inconnu"}><option>Compatible</option><option>Non compatible</option><option>Inconnu</option></select></label>
      <label className="field">FIV<select name="fiv_status" defaultValue={cat?.fiv_status || "Non testé"}><option>Négatif</option><option>Positif</option><option>Non testé</option></select></label>
      <label className="field">FeLV<select name="felv_status" defaultValue={cat?.felv_status || "Non testé"}><option>Négatif</option><option>Positif</option><option>Non testé</option></select></label>
      <label className="field full">État de santé<textarea name="health_condition" defaultValue={cat?.health_condition} required /></label>
      <label className="field full">Personnalité<textarea name="personality" defaultValue={cat?.personality} required /></label>
      <label className="field full">Histoire du sauvetage<textarea name="rescue_story" defaultValue={cat?.rescue_story} required /></label>
      <label className="field full">Besoins particuliers<textarea name="special_needs" defaultValue={cat?.special_needs || "Aucun besoin particulier connu."} /></label>
      <label className="field full">Publication<select name="status" defaultValue={status}><option value="brouillon">Garder en brouillon</option><option value="publie">Publier en un clic</option><option value="adopte">Marquer comme adopté</option></select></label>
    </div>
    {errorMessage ? <p role="alert">L’enregistrement a échoué : {errorMessage}</p> : null}
    <div className="actions"><button className="btn" type="submit" disabled={saving}>{saving ? "Préparation et enregistrement…" : submitLabel}</button><a className="btn secondary" href="/admin">Annuler</a></div>
  </form>;
}
