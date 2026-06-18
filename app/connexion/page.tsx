import { redirect } from "next/navigation";
import { passwordIsValid, setAdminSession } from "@/lib/auth";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") || "");
  if (!passwordIsValid(password)) redirect("/connexion?erreur=1");
  await setAdminSession();
  redirect("/admin");
}

export default async function ConnexionPage({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const { erreur } = await searchParams;
  return <main className="login"><section className="panel login-card stack"><h1>Administration privée</h1><p>Entrez le mot de passe administrateur pour gérer les chats.</p><form className="stack" action={login}><label className="field">Mot de passe<input name="password" type="password" required autoComplete="current-password" /></label>{erreur && <p className="danger">Mot de passe incorrect.</p>}<button className="btn" type="submit">Se connecter</button></form></section></main>;
}
