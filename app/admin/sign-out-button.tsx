import { redirect } from "next/navigation";
import { clearAdminSession } from "@/lib/auth";

async function logout() { "use server"; await clearAdminSession(); redirect("/connexion"); }
export function SignOutButton() { return <form action={logout}><button className="btn secondary">Se déconnecter</button></form>; }
