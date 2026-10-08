"use client";

import { useEffect, useState } from "react";

export default function CatGallery({ photos, name }: { photos: string[]; name: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected]);
  return (
    <>
      <div className="detail-visual">
        {photos?.[0] ? <button className="detail-photo-frame detail-photo-button" type="button" onClick={() => setSelected(photos[0])} aria-label={`Ouvrir la photo de ${name}`}>
          <img className="detail-main-photo" src={photos[0]} alt={`Photo de ${name}`} />
        </button> : <div className="detail-main-photo cat-photo-empty">Photo à venir</div>}
        {photos?.length > 1 && <div className="detail-photo-strip">
          {photos.slice(1).map((photo) => <button className="detail-photo-thumb detail-photo-button" type="button" key={photo} onClick={() => setSelected(photo)} aria-label={`Ouvrir une photo de ${name}`}>
            <img src={photo} srcSet={`${photo} 1x`} alt={`Photo de ${name}`} />
          </button>)}
        </div>}
      </div>
      {selected && <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`Photo de ${name} en grand`} onClick={() => setSelected(null)}>
        <button className="photo-lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Fermer">×</button>
        <img src={selected} alt={`Photo de ${name}`} onClick={(event) => event.stopPropagation()} />
      </div>}
    </>
  );
}
