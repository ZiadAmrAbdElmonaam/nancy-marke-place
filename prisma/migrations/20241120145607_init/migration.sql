/*
  Warnings:

  - Made the column `description` on table `Position` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Position_interviewerId_idx";

-- AlterTable
ALTER TABLE "Position" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "interviewerId" DROP NOT NULL,
ALTER COLUMN "socialMedia" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
