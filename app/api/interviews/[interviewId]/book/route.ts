import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const TEMP_USER_ID = "default-user-id";

interface Props {
  params: Promise<{ interviewId: string }> | { interviewId: string }
}

export async function POST(
  request: Request,
  { params }: Props
) {
  try {
    const resolvedParams = await params;

    if (!resolvedParams?.interviewId) {
      return NextResponse.json(
        { error: 'Interview ID is required' },
        { status: 400 }
      );
    }

    // First, find the interview
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

    // Create or find interviewee
    let interviewee = await prisma.user.findFirst({
      where: {
        email: 'temp-interviewee@example.com'
      }
    });

    if (!interviewee) {
      interviewee = await prisma.user.create({
        data: {
          id: `temp-interviewee-${Date.now()}`,
          email: 'temp-interviewee@example.com',
          name: 'Temporary Interviewee',
        }
      });
    }

    // Generate a unique bill ID
    const billId = `BILL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create the booking
    const booking = await prisma.interviewBooking.create({
      data: {
        interview: {
          connect: { id: interview.id }
        },
        interviewer: {
          connect: { id: interview.interviewerId }
        },
        interviewee: {
          connect: { id: interviewee.id }
        },
        status: 'PENDING',
        billId: billId
      },
      include: {
        interview: true,
        interviewer: true,
        interviewee: true
      }
    });

    return NextResponse.json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error('[INTERVIEW_BOOKING_CREATE]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to book interview',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 