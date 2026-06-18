import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin") && !request.cookies.get("admin_session")?.value) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
