import { publicCats } from "@/lib/supabase-rest";
import AdoptionFilters from "./adoption-filters";

export default async function AdoptionPage() {
  let cats = [];
  try {
    cats = await publicCats();
  } catch {
    cats = [];
  }

  return <AdoptionFilters cats={cats} />;
}
