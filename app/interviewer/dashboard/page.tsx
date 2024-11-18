'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StarIcon } from '@heroicons/react/24/outline'

interface Interview {
  id: number
  position: string
  experience: string
  skills: string[]
}

export default function InterviewerDashboard() {
  const [searchParams, setSearchParams] = useState({
    position: '',
    experienceLevel: '',
    skills: ''
  })
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)

  // Mock interviews data
  const interviews: Interview[] = [
    {
      id: 1,
      position: 'Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: 2,
      position: 'Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: 3,
      position: 'Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js']
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching with params:', searchParams)
  }

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Feedback submitted:', { rating, feedback })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Interviewer Dashboard</h1>

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <Button variant="outline">Preview</Button>
                <Button>Book ($19.99)</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <StarIcon className="h-6 w-6" />
                </button>
              ))}
            </div>
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts on the AI interview quality..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
              />
            </div>
            <Button type="submit">Submit Feedback</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 