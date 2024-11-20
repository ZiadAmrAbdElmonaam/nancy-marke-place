/*
  Warnings:

  - You are about to drop the column `githubUrl` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUrl` on the `Position` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Position" DROP COLUMN "githubUrl",
DROP COLUMN "linkedinUrl",
DROP COLUMN "twitterUrl";

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;
