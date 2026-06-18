export type CatSex = "Femelle" | "Mâle" | "Inconnu";
export type CatStatus = "brouillon" | "publie" | "adopte";

export type Cat = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  age: string;
  sex: CatSex;
  sterilized: boolean;
  vaccinated: boolean;
  health_condition: string;
  personality: string;
  rescue_story: string;
  adoption_fee: string;
  special_needs: string;
  status: CatStatus;
  published_at: string | null;
  adopted_at: string | null;
  photos: string[];
};
