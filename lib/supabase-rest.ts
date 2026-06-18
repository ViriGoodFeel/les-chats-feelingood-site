import type { Cat } from "./types";

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Variables Supabase manquantes.");
  return { url: url.replace(/\/$/, ""), key };
}
async function request<T>(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  const res = await fetch(`${url}${path}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation", ...(init.headers || {}) }, cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  if (res.status === 204) return null as T;
  return (await res.json()) as T;
}
export async function listCats() { return request<Cat[]>("/rest/v1/cats?select=*&order=created_at.desc"); }
export async function publicCats() { return request<Cat[]>("/rest/v1/cats?select=*&status=eq.publie&order=published_at.desc"); }
export async function getCatById(id: string) { const rows = await request<Cat[]>(`/rest/v1/cats?select=*&id=eq.${id}`); return rows[0] || null; }
export async function getCatBySlug(slug: string) { const rows = await request<Cat[]>(`/rest/v1/cats?select=*&slug=eq.${slug}&status=in.(publie,adopte)`); return rows[0] || null; }
export async function findSlug(slug: string) { const rows = await request<Pick<Cat,"id">[]>(`/rest/v1/cats?select=id&slug=eq.${slug}`); return rows[0] || null; }
export async function insertCat(cat: Partial<Cat>) { return request<Cat[]>("/rest/v1/cats", { method: "POST", body: JSON.stringify(cat) }); }
export async function patchCat(id: string, cat: Partial<Cat>) { return request<Cat[]>(`/rest/v1/cats?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(cat) }); }
export async function removeCat(id: string) { return request<null>(`/rest/v1/cats?id=eq.${id}`, { method: "DELETE" }); }
export async function uploadPhoto(path: string, file: File) { const { url, key } = config(); const res = await fetch(`${url}/storage/v1/object/cat-photos/${path}`, { method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": file.type || "image/jpeg" }, body: file }); if (!res.ok) throw new Error(await res.text()); return `${url}/storage/v1/object/public/cat-photos/${path}`; }
