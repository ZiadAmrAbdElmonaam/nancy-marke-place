'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

interface Interview {
  id: number
  position: string
  experience: string
  skills: string[]
  description?: string
  questions?: string[]
  interviewer?: {
    name: string
    title: string
    company: string
    yearsOfExperience: number
  }
}

export default function InterviewerDashboard() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    position: '',
    experienceLevel: '',
    skills: ''
  })

  // Mock interviews data with additional preview information
  const interviews: Interview[] = [
    {
      id: 1,
      position: 'Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      description: 'This interview focuses on modern frontend development practices and React ecosystem.',
      questions: [
        'Explain React component lifecycle',
        'How do you manage state in React?',
        'Describe your experience with TypeScript'
      ],
      interviewer: {
        name: 'John Smith',
        title: 'Senior Frontend Engineer',
        company: 'Tech Solutions Inc.',
        yearsOfExperience: 8
      }
    },
    {
      id: 2,
      position: 'Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      description: 'Advanced frontend concepts and architectural patterns.',
      questions: [
        'What are React hooks?',
        'Explain Redux architecture',
        'How do you handle API integration?'
      ],
      interviewer: {
        name: 'Jane Doe',
        title: 'Senior Frontend Engineer',
        company: 'Tech Solutions Inc.',
        yearsOfExperience: 10
      }
    },
    {
      id: 3,
      position: 'Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      description: 'Focus on performance optimization and best practices.',
      questions: [
        'How do you optimize React applications?',
        'Explain code splitting',
        'What are your testing strategies?'
      ],
      interviewer: {
        name: 'Bob Johnson',
        title: 'Senior Frontend Engineer',
        company: 'Tech Solutions Inc.',
        yearsOfExperience: 12
      }
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching with params:', searchParams)
  }

  const handlePreview = (interviewId: number) => {
    router.push(`/interviewee/${interviewId}`)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Interviewee Dashboard</h1>

      {/* Search Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search AI-Generated Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="e.g., Frontend Developer"
                  value={searchParams.position}
                  onChange={(e) => setSearchParams({...searchParams, position: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Input
                  id="experienceLevel"
                  placeholder="e.g., Senior, Mid-Level"
                  value={searchParams.experienceLevel}
                  onChange={(e) => setSearchParams({...searchParams, experienceLevel: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g., JavaScript, Python"
                  value={searchParams.skills}
                  onChange={(e) => setSearchParams({...searchParams, skills: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Button type="submit" size="lg">Search</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Interview Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interviews.map((interview) => (
          <Card key={interview.id}>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">AI Interview #{interview.id}</h3>
              <div className="space-y-2 mb-4">
                <p><span className="font-medium">Position:</span> {interview.position}</p>
                <p><span className="font-medium">Experience:</span> {interview.experience}</p>
                <p><span className="font-medium">Skills:</span> {interview.skills.join(', ')}</p>
              </div>
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => handlePreview(interview.id)}>View Details</Button>
                <Button>Book ($19.99)</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 