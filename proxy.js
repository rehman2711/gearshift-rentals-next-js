import { NextResponse } from "next/server";

export function proxy(req) {
  console.log("ALL COOKIES:", req.cookies.getAll());

  const token = req.cookies.get("token")?.value;

  console.log("TOKEN:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};