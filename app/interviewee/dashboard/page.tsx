'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function IntervieweeDashboard() {
  const [experience, setExperience] = useState({ position: '', years: '', skills: '' })
  const [questions, setQuestions] = useState('')

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle experience submission
    console.log('Experience submitted:', experience)
  }

  const handleQuestionsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle questions submission
    console.log('Questions submitted:', questions)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Interviewee Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleExperienceSubmit} className="space-y-4">
              <div>
                <Label htmlFor="position">Position</Label>
                <Input 
                  id="position" 
                  value={experience.position}
                  onChange={(e) => setExperience({...experience, position: e.target.value})}
                  placeholder="e.g., Frontend Developer"
                />
              </div>
              <div>
                <Label htmlFor="years">Years of Experience</Label>
                <Input 
                  id="years" 
                  type="number"
                  value={experience.years}
                  onChange={(e) => setExperience({...experience, years: e.target.value})}
                  placeholder="e.g., 5"
                />
              </div>
              <div>
                <Label htmlFor="skills">Key Skills/Technologies</Label>
                <Input 
                  id="skills" 
                  value={experience.skills}
                  onChange={(e) => setExperience({...experience, skills: e.target.value})}
                  placeholder="e.g., JavaScript, React, Node.js"
                />
              </div>
              <Button type="submit">Add Experience</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleQuestionsSubmit} className="space-y-4">
              <div>
                <Label htmlFor="questions">Relevant Questions</Label>
                <Textarea 
                  id="questions" 
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  placeholder="Enter technical and behavioral questions..."
                  rows={5}
                />
              </div>
              <Button type="submit">Submit Questions</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button>Generate AI Interview</Button>
      </div>
    </div>
  )
} 