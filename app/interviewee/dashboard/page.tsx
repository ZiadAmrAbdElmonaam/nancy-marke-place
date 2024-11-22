'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Search, Briefcase, Clock } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  }
}

export default function IntervieweeDashboard() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    techStack: '',
    experience: '',
    domain: ''
  })

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch('/api/interviews')
        if (!response.ok) throw new Error('Failed to fetch interviews')
        const data = await response.json()
        setInterviews(data.data)
        setFilteredInterviews(data.data)
      } catch (error) {
        console.error('Error fetching interviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInterviews()
  }, [])

  const handleSearch = () => {
    let filtered = interviews

    if (filters.techStack) {
      filtered = filtered.filter(interview => 
        interview.techStack.toLowerCase().includes(filters.techStack.toLowerCase())
      )
    }

    if (filters.experience) {
      filtered = filtered.filter(interview => 
        interview.interviewerProfile.experience <= parseInt(filters.experience)
      )
    }

    if (filters.domain) {
      filtered = filtered.filter(interview => 
        interview.domain === filters.domain
      )
    }

    setFilteredInterviews(filtered)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Available Interviews</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="techStack" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Tech Stack</label>
              <Input
                id="techStack"
                value={filters.techStack}
                onChange={(e) => setFilters(prev => ({ ...prev, techStack: e.target.value }))}
                placeholder="e.g., MERN, LAMP, etc."
              />
            </div>

            <div>
              <label htmlFor="experience" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Max Experience Required</label>
              <Input
                id="experience"
                type="number"
                value={filters.experience}
                onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Years of experience"
              />
            </div>

            <div>
              <label htmlFor="domain" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Domain</label>
              <Select value={filters.domain} onValueChange={(value) => setFilters(prev => ({ ...prev, domain: value }))}>
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
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id}>
            <CardHeader>
              <CardTitle>{interview.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="mr-2 h-4 w-4" />
                {interview.interviewerProfile.company}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  Experience Required: {interview.interviewerProfile.experience} years
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{interview.techStack}</Badge>
                  <Badge variant="secondary">{interview.programmingLanguage}</Badge>
                  <Badge variant="secondary">{interview.domain}</Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    By {interview.interviewerProfile.title}
                  </p>
                  <p className="text-lg font-semibold mt-2">
                    ${interview.price}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/interviewee/interview/${interview.id}`}>View Details</Link>
              </Button>
              <Button>
                <Briefcase className="mr-2 h-4 w-4" /> Book Interview
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

