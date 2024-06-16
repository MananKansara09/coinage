import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/db/db";
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const checkexistingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (checkexistingUser) {
      return NextResponse.json(
        { message: "User account already exists, please log in." },
        { status: 400 }
      );
    } else {
      const salt = bcrypt.genSaltSync(Number(process.env.SALTROUND) || 10);
      const hash = bcrypt.hashSync(data.password, salt);
      const creatingUser = await prisma.user.create({
        data: { email: data.email, password: hash },
      });
      return NextResponse.json(
        { data: creatingUser, message: "Sucessfully created account" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: `An error occurred, ${error.message}` },
      { status: 500 }
    );
  }
}
