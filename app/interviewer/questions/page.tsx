'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function QuestionsPage() {
  const [questions, setQuestions] = useState('')

  const handleQuestionsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle questions submission
    console.log('Questions submitted:', questions)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Interview Questions</h1>
      
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
  )
} 