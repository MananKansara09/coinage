import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";

export async function validateRequestBody(request: NextRequest, schema: ZodSchema) {
  try {
    const body = await request.json();
    schema.parse(body);
    return { valid: true, body };
  } catch (error) {
    return { valid: false, error };
  }
}
