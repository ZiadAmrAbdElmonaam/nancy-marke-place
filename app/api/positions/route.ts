import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const positions = await db.position.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(positions);
  } catch (error) {
    console.error("[POSITIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 