import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { positionId: string } }
) {
  try {
    const position = await db.position.findUnique({
      where: {
        id: params.positionId,
      },
    });

    if (!position) {
      return new NextResponse("Position not found", { status: 404 });
    }

    return NextResponse.json(position);
  } catch (error) {
    console.error("[POSITION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 