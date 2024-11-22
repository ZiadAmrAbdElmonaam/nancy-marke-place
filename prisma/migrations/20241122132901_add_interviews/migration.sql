-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "programmingLanguage" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "questions" TEXT[],
    "interviewerId" TEXT NOT NULL,
    "interviewerProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewerProfileId_fkey" FOREIGN KEY ("interviewerProfileId") REFERENCES "InterviewerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
