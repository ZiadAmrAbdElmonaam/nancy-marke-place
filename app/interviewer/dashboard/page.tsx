import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import InterviewerProfileForm from '@/components/interviewer/profile-form'

export default async function InterviewerDashboard() {
  const TEMP_USER_ID = "default-user-id"

  const profile = await prisma.interviewerProfile.findUnique({
    where: { userId: TEMP_USER_ID }
  })

  const formattedProfile = profile ? {
    ...profile,
    imageUrl: profile.imageUrl || undefined,
    linkedin: profile.linkedin || undefined,
    github: profile.github || undefined,
    twitter: profile.twitter || undefined,
    country: profile.country,
    company: profile.company,
  } : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {profile ? 'Your Interviewer Profile' : 'Create Interviewer Profile'}
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <InterviewerProfileForm existingProfile={formattedProfile} />
      </Suspense>
    </div>
  )
}

