import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Temporary user ID for development
const TEMP_USER_ID = "default-user-id";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const profile = await prisma.interviewerProfile.create({
      data: {
        userId: TEMP_USER_ID,
        ...body,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const profile = await prisma.interviewerProfile.update({
      where: { userId: TEMP_USER_ID },
      data: body,
    });

    return NextResponse.json(profile);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
} 