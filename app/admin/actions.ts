"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { catSchema, slugify } from "@/lib/cats";
import { findSlug, getCatById, insertCat, patchCat, removeCat, uploadPhoto } from "@/lib/supabase-rest";
import { requireAdmin } from "@/lib/auth";

function bool(value: FormDataEntryValue | null) { return value === "true"; }
function values(formData: FormData) {
  return catSchema.parse({ name: formData.get("name"), age: formData.get("age"), sex: formData.get("sex"), sterilized: bool(formData.get("sterilized")), vaccinated: bool(formData.get("vaccinated")), health_condition: formData.get("health_condition"), personality: formData.get("personality"), rescue_story: formData.get("rescue_story"), adoption_fee: formData.get("adoption_fee"), special_needs: formData.get("special_needs") || "Aucun besoin particulier connu.", status: formData.get("status") || "brouillon" });
}
async function uploadPhotos(formData: FormData, catId: string, existing: string[] = []) {
  const files = formData.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const urls = [...existing];
  for (const file of files) {
    const ext = file.name.split(".").pop() || "jpg";
    urls.push(await uploadPhoto(`${catId}/${crypto.randomUUID()}.${ext}`, file));
  }
  return urls;
}
async function uniqueSlug(name: string, id?: string) {
  const base = slugify(name); let slug = base; let i = 2;
  while (true) { const found = await findSlug(slug); if (!found || found.id === id) return slug; slug = `${base}-${i++}`; }
}

export async function createCat(formData: FormData) {
  await requireAdmin();
  const parsed = values(formData); const id = crypto.randomUUID(); const slug = await uniqueSlug(parsed.name); const photos = await uploadPhotos(formData, id); const now = new Date().toISOString();
  await insertCat({ id, ...parsed, slug, photos, published_at: parsed.status === "publie" ? now : null, adopted_at: parsed.status === "adopte" ? now : null });
  revalidatePath("/"); redirect("/admin?message=chat-ajoute");
}
export async function updateCat(id: string, existingPhotos: string[], formData: FormData) {
  await requireAdmin();
  const parsed = values(formData); const slug = await uniqueSlug(parsed.name, id); const photos = await uploadPhotos(formData, id, existingPhotos); const current = await getCatById(id); const now = new Date().toISOString();
  await patchCat(id, { ...parsed, slug, photos, published_at: parsed.status === "publie" && !current?.published_at ? now : current?.published_at, adopted_at: parsed.status === "adopte" && !current?.adopted_at ? now : parsed.status !== "adopte" ? null : current?.adopted_at });
  revalidatePath("/"); revalidatePath(`/adoption/${slug}`); redirect("/admin?message=chat-modifie");
}
export async function deleteCat(id: string) { await requireAdmin(); await removeCat(id); revalidatePath("/"); redirect("/admin?message=chat-supprime"); }
export async function markAdopted(id: string) { await requireAdmin(); await patchCat(id, { status: "adopte", adopted_at: new Date().toISOString() }); revalidatePath("/"); redirect("/admin?message=chat-adopte"); }
