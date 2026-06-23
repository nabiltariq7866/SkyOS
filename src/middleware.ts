import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("skytrade_session");
  const roleCookie = request.cookies.get("skytrade_role");
  const pathname = request.nextUrl.pathname;

  // Protected routes
  const protectedRoutes = ["/admin", "/municipality", "/operator", "/owner"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionCookie && roleCookie) {
    const role = roleCookie.value;
    const allowedRoutes: Record<string, string[]> = {
      admin: ["/admin"],
      municipality: ["/municipality"],
      operator: ["/operator"],
      owner: ["/owner"],
    };

    const isAllowed = allowedRoutes[role]?.some((route) => pathname.startsWith(route));
    if (!isAllowed && pathname !== "/login") {
      return NextResponse.redirect(new URL(allowedRoutes[role]?.[0] || "/login", request.url));
    }
  }

  if (pathname === "/login" && sessionCookie && roleCookie) {
    const role = roleCookie.value;
    const redirectMap: Record<string, string> = {
      admin: "/admin",
      municipality: "/municipality",
      operator: "/operator",
      owner: "/owner",
    };
    return NextResponse.redirect(new URL(redirectMap[role] || "/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
