import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Props {
  params: Promise<{ interviewId: string }> | { interviewId: string }
}

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const resolvedParams = await params;
    
    const interview = await prisma.interview.findUnique({
      where: {
        id: resolvedParams.interviewId
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