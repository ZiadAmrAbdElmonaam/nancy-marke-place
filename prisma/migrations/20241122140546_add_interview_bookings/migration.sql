-- CreateTable
CREATE TABLE "InterviewBooking" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "interviewerId" TEXT NOT NULL,
    "intervieweeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "billId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewBooking_billId_key" ON "InterviewBooking"("billId");

-- CreateIndex
CREATE INDEX "InterviewBooking_interviewId_idx" ON "InterviewBooking"("interviewId");

-- CreateIndex
CREATE INDEX "InterviewBooking_interviewerId_idx" ON "InterviewBooking"("interviewerId");

-- CreateIndex
CREATE INDEX "InterviewBooking_intervieweeId_idx" ON "InterviewBooking"("intervieweeId");

-- AddForeignKey
ALTER TABLE "InterviewBooking" ADD CONSTRAINT "InterviewBooking_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewBooking" ADD CONSTRAINT "InterviewBooking_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewBooking" ADD CONSTRAINT "InterviewBooking_intervieweeId_fkey" FOREIGN KEY ("intervieweeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
