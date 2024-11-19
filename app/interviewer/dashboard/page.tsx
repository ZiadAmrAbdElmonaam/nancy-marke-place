'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function IntervieweeDashboard() {
  const [experience, setExperience] = useState({ position: '', years: '', skills: '' })

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle experience submission
    console.log('Experience submitted:', experience)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Interviewer Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Experience Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleExperienceSubmit} className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="position" className="text-sm">Position</Label>
                <Input 
                  id="position" 
                  value={experience.position}
                  onChange={(e) => setExperience({...experience, position: e.target.value})}
                  placeholder="Frontend Developer"
                  className="h-9"
                />
              </div>
              <div className="w-[100px]">
                <Label htmlFor="years" className="text-sm">Years</Label>
                <Input 
                  id="years" 
                  type="number"
                  value={experience.years}
                  onChange={(e) => setExperience({...experience, years: e.target.value})}
                  placeholder="5"
                  className="h-9"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="skills" className="text-sm">Skills</Label>
                <Input 
                  id="skills" 
                  value={experience.skills}
                  onChange={(e) => setExperience({...experience, skills: e.target.value})}
                  placeholder="JavaScript, React, Node.js"
                  className="h-9"
                />
              </div>
              <Button type="submit" className="h-9">Add</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 