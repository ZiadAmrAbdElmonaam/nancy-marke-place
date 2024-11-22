import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { interviewId: string } }
) {
  try {
    const interview = await prisma.interview.findUnique({
      where: {
        id: params.interviewId
      },
      include: {
        interviewer: true,
        interviewerProfile: true
      }
    });

    if (!interview) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: interview });
  } catch (error) {
    console.error('[INTERVIEW_GET]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch interview' },
      { status: 500 }
    );
  }
} 