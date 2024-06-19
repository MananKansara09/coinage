import { NextResponse, type NextRequest } from "next/server";
import { validateRequestBody } from "@/utils/validation";
import {
  requestBodySchema,
  loginrequestBodySchema,
} from "@/utils/schema/auth.schema";
export async function middleware(request: NextRequest) {
  if (checkingPath.includes(request.nextUrl.pathname)) {
    const findIndex = checkingPath.findIndex(
      (path) => path === request.nextUrl.pathname
    );
    const { valid, error } = await validateRequestBody(
      request,
      validationSchema[findIndex]
    );
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
  } else if (frontendPath.includes(request.nextUrl.pathname)) {
    console.log(Object.keys(request.cookies));
    if (Object.keys(request.cookies).length <= 2) {
      const domain = request.headers.get("host");
      const redirectUrl = `https://${domain}/auth`;
      return NextResponse.redirect(redirectUrl);
    }
    console.log(request.cookies);
  }

  return NextResponse.next();
}
const checkingPath = ["/api/auth/signup", "/api/auth/signin"];
const frontendPath = ["/user", "/auth", "/admin", "/"];
const validationSchema = [requestBodySchema, loginrequestBodySchema];
export const config = {
  matcher: [
    "/api/:path*",
    "/auth/:path*",
    "/user/:path*",
    "/admin/:path*",
    "/",
  ],
};
