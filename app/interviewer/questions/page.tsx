'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X } from 'lucide-react'
import { toast } from 'sonner'

interface Question {
  id: string
  text: string
}

export default function QuestionsPage() {
  const [techStack, setTechStack] = useState('')
  const [programmingLanguage, setProgrammingLanguage] = useState('')
  const [domain, setDomain] = useState('')
  const [price, setPrice] = useState('')
  const [questions, setQuestions] = useState<Question[]>([{ id: '1', text: '' }])

  const handleQuestionsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          techStack,
          programmingLanguage,
          domain,
          price: parseFloat(price),
          questions: questions.map(q => q.text)
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create interview')
      }

      toast.success('Interview created successfully')
      // Reset form
      setTechStack('')
      setProgrammingLanguage('')
      setDomain('')
      setPrice('')
      setQuestions([{ id: '1', text: '' }])
    } catch (error) {
      toast.error('Failed to create interview')
      console.error('Error creating interview:', error)
    }
  }

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now().toString(), text: '' }])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id))
    }
  }

  const updateQuestion = (id: string, text: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Interview Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Add Interview</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleQuestionsSubmit} className="space-y-6">
            <div>
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input
                id="techStack"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g., MERN, LAMP, etc."
              />
            </div>

            <div>
              <Label htmlFor="programmingLanguage">Programming Language</Label>
              <Input
                id="programmingLanguage"
                value={programmingLanguage}
                onChange={(e) => setProgrammingLanguage(e.target.value)}
                placeholder="e.g., JavaScript, Python, etc."
              />
            </div>

            <div>
              <Label htmlFor="domain">Domain</Label>
              <Select value={domain} onValueChange={setDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="fullstack">Full Stack</SelectItem>
                  <SelectItem value="ai">AI/ML</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 19.99"
              />
            </div>

            <div className="space-y-4">
              <Label>Questions</Label>
              {questions.map((question) => (
                <div key={question.id} className="flex gap-2">
                  <Textarea
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, e.target.value)}
                    placeholder="Enter a question..."
                    rows={2}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeQuestion(question.id)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addQuestion}
              >
                Add Question
              </Button>
            </div>

            <Button type="submit">Generate Interview</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 