'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Clock, Building } from 'lucide-react'

interface Interview {
  id: string
  title: string
  techStack: string
  programmingLanguage: string
  domain: string
  price: number
  questions: string[]
  interviewerProfile: {
    title: string
    experience: number
    company: string
    country: string
  }
}

export default function InterviewDetailsClient({ interviewId }: { interviewId: string }) {
  const [interview, setInterview] = useState<Interview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await fetch(`/api/interviews/${interviewId}`)
        if (!response.ok) throw new Error('Failed to fetch interview')
        const data = await response.json()
        setInterview(data.data)
      } catch (error) {
        console.error('Error fetching interview:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInterview()
  }, [interviewId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!interview) {
    return <div>Interview not found</div>
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{interview.title}</CardTitle>
          <CardDescription>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center text-sm">
                <Building className="mr-2 h-4 w-4" />
                {interview.interviewerProfile.company}
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4" />
                {interview.interviewerProfile.experience} years experience
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              <Badge>{interview.techStack}</Badge>
              <Badge>{interview.programmingLanguage}</Badge>
              <Badge>{interview.domain}</Badge>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Sample Questions</h2>
            <ul className="list-disc list-inside space-y-2">
              {interview.questions.map((question, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {question}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Interviewer</h2>
            <p className="text-sm text-muted-foreground">
              {interview.interviewerProfile.title} from {interview.interviewerProfile.country}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold">${interview.price}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Briefcase className="mr-2 h-4 w-4" /> Book This Interview
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 