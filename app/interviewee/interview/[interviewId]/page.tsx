import { Suspense } from 'react';
import InterviewDetailsClient from './InterviewDetailsClient';

export default function InterviewDetails({
  params
}: {
  params: { interviewId: string }
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewDetailsClient interviewId={params.interviewId} />
    </Suspense>
  );
} 