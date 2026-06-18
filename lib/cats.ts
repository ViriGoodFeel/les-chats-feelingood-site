import { z } from "zod";
import type { CatStatus } from "./types";

export const catSchema = z.object({
  name: z.string().trim().min(1, "Le nom est obligatoire."),
  age: z.string().trim().min(1, "L'âge est obligatoire."),
  sex: z.enum(["Femelle", "Mâle", "Inconnu"]),
  sterilized: z.coerce.boolean(),
  vaccinated: z.coerce.boolean(),
  health_condition: z.string().trim().min(1, "L'état de santé est obligatoire."),
  personality: z.string().trim().min(1, "La personnalité est obligatoire."),
  rescue_story: z.string().trim().min(1, "L'histoire du sauvetage est obligatoire."),
  adoption_fee: z.string().trim().min(1, "Les frais d'adoption sont obligatoires."),
  special_needs: z.string().trim().default("Aucun besoin particulier connu."),
  status: z.enum(["brouillon", "publie", "adopte"]).default("brouillon"),
});

export type CatFormValues = z.infer<typeof catSchema>;

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || "chat";
}

export function statusLabel(status: CatStatus) {
  if (status === "publie") return "Publié";
  if (status === "adopte") return "Adopté";
  return "Brouillon";
}

export function publicCatPath(slug: string) {
  return `/adoption/${slug}`;
}
