import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface SocialLink {
  platform: string;
  url: string;
}

interface CreatePositionPayload {
  title: string;
  yearsOfExperience: number;
  requiredSkills: string[];
  description: string;
  socialLinks?: SocialLink[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreatePositionPayload;
    
    console.log('Received body:', body);
    console.log('Social links:', body.socialLinks);
    
    // Validate the request body
    if (!body || !body.title || !body.yearsOfExperience || !body.requiredSkills || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    let user = await prisma.user.findFirst({
      where: {
        email: 'anonymous@example.com'
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'anonymous@example.com',
          name: 'Anonymous User'
        }
      });
    }

    const positionData: Prisma.PositionCreateInput = {
      title: body.title,
      yearsOfExperience: body.yearsOfExperience,
      requiredSkills: Array.isArray(body.requiredSkills) ? body.requiredSkills : [],
      description: body.description,
      interviewer: {
        connect: { id: user.id }
      },
      socialLinks: body.socialLinks && body.socialLinks.length > 0 ? {
        create: body.socialLinks.map(link => ({
          platform: link.platform,
          url: link.url
        }))
      } : undefined
    };

    console.log('Position data to create:', positionData);

    // Create position with social links
    const position = await prisma.position.create({
      data: positionData,
      include: {
        interviewer: true,
        socialLinks: true
      }
    });

    console.log('Created position with links:', position);
    return NextResponse.json(position);
  } catch (error) {
    console.error('Position creation error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Failed to create position', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 

export async function GET() {
  try {
    const positions = await prisma.position.findMany({
      include: {
        interviewer: true,
        socialLinks: true
      }
    });
    
    return NextResponse.json(positions);
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch positions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 