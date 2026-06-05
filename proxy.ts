import { type NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

const protectedRoutes = [
  "/notverified",
  "/dashboard",
  "/dashboard/appointments",
];
const publicRoutes = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const headers = new Headers(req.headers);

  headers.set("x-pathname", new URL(req.url).pathname);

  const isProtectedRoute = protectedRoutes.includes(path);

  const isPublicRoute = publicRoutes.includes(path);

  const { response, user } = await updateSession(req);

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    path.startsWith("/notverified") &&
    user?.user_metadata.verified !== false
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (
    user?.user_metadata.verified === false &&
    !path.startsWith("/notverified") &&
    isProtectedRoute
  ) {
    return NextResponse.redirect(new URL("/notverified", req.url));
  }

  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}
