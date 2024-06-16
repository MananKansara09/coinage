import { NextResponse,NextRequest,NextMiddleware } from "next/server";
export function GET(request:Request) {
    return NextResponse.json({message: 'Server is Running! 🚀'})
}