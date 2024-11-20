import { Suspense } from 'react';
import PositionDetailsClient from './PositionDetailsClient';

export default function PositionDetails({
  params
}: {
  params: { positionId: string }
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PositionDetailsClient positionId={params.positionId} />
    </Suspense>
  );
} 