import { CatForm } from "../../cat-form";
import { createCat } from "../../actions";

export default function NewCatPage() {
  return <div className="stack"><h1>Ajouter un chat</h1><p>Ajoutez les informations, choisissez les photos depuis votre téléphone, puis publiez en un clic.</p><CatForm action={createCat} submitLabel="Enregistrer et publier si demandé" /></div>;
}
