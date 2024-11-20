-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "requiredSkills" TEXT[],
    "description" TEXT,
    "interviewerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Position_interviewerId_idx" ON "Position"("interviewerId");
