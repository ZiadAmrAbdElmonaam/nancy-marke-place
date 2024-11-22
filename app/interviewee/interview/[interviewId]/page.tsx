import { Suspense } from 'react';
import InterviewDetailsClient from './InterviewDetailsClient';

interface Props {
  params: Promise<{ interviewId: string }> | { interviewId: string }
}

export default async function InterviewDetails({ params }: Props) {
  const resolvedParams = await params;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewDetailsClient interviewId={resolvedParams.interviewId} />
    </Suspense>
  );
} 