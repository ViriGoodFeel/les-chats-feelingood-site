import { publicCats } from "@/lib/supabase-rest";
import type { Cat } from "@/lib/types";
import AdoptionFilters from "./adoption-filters";

export default async function AdoptionPage() {
  let cats: Cat[] = [];
  try {
    cats = await publicCats();
  } catch {
    cats = [];
  }

  return <AdoptionFilters cats={cats} />;
}
