import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { positionId: string } }
) {
  try {
    const position = await prisma.position.findUnique({
      where: {
        id: params.positionId
      },
      include: {
        socialLinks: true
      }
    });

    if (!position) {
      return NextResponse.json(
        { error: 'Position not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(position);
  } catch (error) {
    console.error('Error fetching position:', error);
    return NextResponse.json(
      { error: 'Failed to fetch position' },
      { status: 500 }
    );
  }
} 