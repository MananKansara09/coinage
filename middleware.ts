import { NextResponse, type NextRequest } from "next/server";
import { validateRequestBody } from "@/utils/validation";
import { requestBodySchema } from "@/utils/schema/auth.schema";
export async function middleware(request: NextRequest) {
  if (checkingPath.includes(request.nextUrl.pathname)) {
    const { valid, error } = await validateRequestBody(
      request,
      requestBodySchema
    );
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
  }
  return NextResponse.next();
}
const checkingPath = ["/api/auth/signup"];
export const config = {
  matcher: ["/api/:path*"],
};
