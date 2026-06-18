import { notFound } from "next/navigation";
import { CatForm } from "../../cat-form";
import { updateCat } from "../../actions";
import { getCatById } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";

export default async function EditCatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getCatById(id);
  if (!data) notFound();
  const cat = data as Cat;
  return <div className="stack"><h1>Modifier {cat.name}</h1><CatForm cat={cat} action={updateCat.bind(null, cat.id, cat.photos || [])} submitLabel="Enregistrer les changements" /></div>;
}
