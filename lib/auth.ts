import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "admin_session";

function secret() { return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "change-me"; }
export function sign(value: string) { return `${value}.${createHmac("sha256", secret()).update(value).digest("hex")}`; }
export function verify(signed?: string) { if (!signed) return false; const [value, mac] = signed.split("."); if (!value || !mac) return false; const expected = sign(value).split(".")[1]; return mac.length === expected.length && timingSafeEqual(Buffer.from(mac), Buffer.from(expected)); }
export async function isAdmin() { return verify((await cookies()).get(COOKIE)?.value); }
export async function requireAdmin() { if (!(await isAdmin())) throw new Error("Accès administrateur requis."); }
export async function setAdminSession() { (await cookies()).set(COOKIE, sign("admin"), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 }); }
export async function clearAdminSession() { (await cookies()).delete(COOKIE); }
export function passwordIsValid(password: string) { return Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD; }
