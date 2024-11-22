import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Temporary user ID for development
const TEMP_USER_ID = "default-user-id";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create user if it doesn't exist
    let user = await prisma.user.findUnique({
      where: { id: TEMP_USER_ID }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: TEMP_USER_ID,
          email: "temp@example.com",
          name: body.name,
        }
      });
    }

    // Create the interviewer profile
    const profile = await prisma.interviewerProfile.create({
      data: {
        userId: user.id,
        title: body.name,
        description: body.position,
        experience: body.experience || 0,
        country: body.country,
        company: body.company,
        linkedin: body.linkedin || null,
        github: body.github || null,
        twitter: body.twitter || null,
      },
    });

    return NextResponse.json({ success: true, data: profile });

  } catch (error) {
    console.error("[INTERVIEWER_PROFILE_POST]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    const profile = await prisma.interviewerProfile.update({
      where: { userId: TEMP_USER_ID },
      data: {
        title: body.name,
        description: body.position,
        experience: body.experience || 0,
        country: body.country,
        company: body.company,
        linkedin: body.linkedin || null,
        github: body.github || null,
        twitter: body.twitter || null,
      },
    });

    return NextResponse.json({ success: true, data: profile });

  } catch (error) {
    console.error("[INTERVIEWER_PROFILE_PUT]", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
} 