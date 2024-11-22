import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const TEMP_USER_ID = "default-user-id";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get the interviewer profile
    const interviewerProfile = await prisma.interviewerProfile.findFirst();

    if (!interviewerProfile) {
      return NextResponse.json(
        { error: 'No interviewer profile found. Please create a profile first.' },
        { status: 404 }
      );
    }

    // Create the interview using the existing interviewer's profile
    const interview = await prisma.interview.create({
      data: {
        title: `${body.domain} Interview - ${body.programmingLanguage}`,
        techStack: body.techStack,
        programmingLanguage: body.programmingLanguage,
        domain: body.domain,
        price: body.price,
        questions: body.questions,
        interviewerId: interviewerProfile.userId, // Use the userId from interviewer profile
        interviewerProfileId: interviewerProfile.id // Use the profile ID
      },
      include: {
        interviewer: true,
        interviewerProfile: true
      }
    });

    return NextResponse.json({ success: true, data: interview });
  } catch (error) {
    console.error('[INTERVIEW_CREATE]', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create interview',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const interviews = await prisma.interview.findMany({
      include: {
        interviewer: true,
        interviewerProfile: true
      }
    });

    return NextResponse.json({ success: true, data: interviews });
  } catch (error) {
    console.error('[INTERVIEW_GET]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch interviews' },
      { status: 500 }
    );
  }
} 