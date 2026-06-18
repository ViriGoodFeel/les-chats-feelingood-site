import Link from "next/link";
import { SignOutButton } from "./sign-out-button";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <div className="admin-layout"><aside className="sidebar stack"><Link className="brand" href="/admin">Administration</Link><nav><Link href="/admin">Tableau de bord</Link><Link href="/admin/chats/nouveau">Ajouter un chat</Link><Link href="/">Voir le site public</Link></nav><SignOutButton /></aside><main className="main">{children}</main></div>;
}
