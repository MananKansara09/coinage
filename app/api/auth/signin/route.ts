import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/db/db";
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      return NextResponse.json(
        { message: "No user account is found sign up first!" },
        { status: 400 }
      );
    }
    const isPasswordValid = bcrypt.compare(data.password, user?.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password !" },
        { status: 400 }
      );
    }
    const existingSession = await prisma.session.findFirst({
      where: { userId: user.id },
    });

    let session;
    if (existingSession) {
      // Update the existing session details
      const additionalInfo: any = existingSession.additionalInfo || {};
      additionalInfo.totalSessions = (additionalInfo.totalSessions || 0) + 1;

      session = await prisma.session.update({
        where: { id: existingSession.id },
        data: {
          totalSessions: existingSession.totalSessions + 1,
          totalRequests: 0,
          visitedPages: [],
          additionalInfo,
        },
      });
    } else {
      // Create a new session for the user
      const additionalInfo = { totalSessions: 1 };

      session = await prisma.session.create({
        data: {
          userId: user.id,
          totalSessions: 1,
          totalRequests: 0,
          visitedPages: [],
          additionalInfo,
        },
      });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        sessionId: session.id,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return NextResponse.json(
      { data: { token, user }, message: "Login Sucessfull !" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: `An error occurred, ${error.message}` },
      { status: 500 }
    );
  }
}
