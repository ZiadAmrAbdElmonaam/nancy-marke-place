/*
  Warnings:

  - Added the required column `candidateName` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "candidateName" TEXT NOT NULL,
ADD COLUMN     "coverLetter" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "resumeUrl" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "InterviewerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "experience" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "linkedin" TEXT,
    "github" TEXT,
    "twitter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewerProfile_userId_key" ON "InterviewerProfile"("userId");

-- AddForeignKey
ALTER TABLE "InterviewerProfile" ADD CONSTRAINT "InterviewerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
