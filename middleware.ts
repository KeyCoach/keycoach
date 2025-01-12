import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authenticatedPaths = ["/api/user"];

export function middleware(request: NextRequest) {
  const requiresAuth = authenticatedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (requiresAuth) {
    const token = request.cookies.get("token");
    if (token) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
    }
  }
}
