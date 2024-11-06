import { NextResponse } from "next/server";
import { COOKIES } from "./constants/cookie_constants";

export default async function middleware(request) {
  const isLoggedIn = request.cookies.get(COOKIES.IS_LOGGEDIN)?.value;

  let currentUrl = request.url;

  if (!isLoggedIn && currentUrl.includes("/dashboard")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (isLoggedIn && currentUrl === "http://localhost:3000") {
    return NextResponse.redirect(new URL("/dashboard", currentUrl));
  }
}
