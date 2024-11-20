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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { title, yearsOfExperience, requiredSkills, description } = body;

    // Validate required fields
    if (!title || typeof title !== 'string') {
      return new NextResponse("Invalid title", { status: 400 });
    }

    if (!yearsOfExperience || typeof yearsOfExperience !== 'number') {
      return new NextResponse("Invalid years of experience", { status: 400 });
    }

    if (!requiredSkills || !Array.isArray(requiredSkills) || requiredSkills.length === 0) {
      return new NextResponse("Invalid required skills", { status: 400 });
    }

    const position = await db.position.create({
      data: {
        title: title.trim(),
        yearsOfExperience,
        requiredSkills: requiredSkills.map(skill => skill.trim()).filter(Boolean),
        description: description?.trim() || null,
        interviewerId: "anonymous"
      },
    });

    return NextResponse.json(position);
  } catch (error) {
    console.error("[POSITIONS_POST]", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Error", 
      { status: 500 }
    );
  }
} 