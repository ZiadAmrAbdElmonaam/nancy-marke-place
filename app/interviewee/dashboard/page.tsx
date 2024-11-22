'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Search, Briefcase, Clock } from 'lucide-react'

interface Position {
  id: string
  title: string
  yearsOfExperience: number
  requiredSkills: string[]
  description: string | null
}

export default function IntervieweeDashboard() {
  const [positions, setPositions] = useState<Position[]>([])
  const [filteredPositions, setFilteredPositions] = useState<Position[]>([])
  const [filters, setFilters] = useState({
    position: '',
    experience: '',
    skills: ''
  })

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch('/api/positions')
        if (!response.ok) throw new Error('Failed to fetch positions')
        const data = await response.json()
        setPositions(data)
        setFilteredPositions(data)
      } catch (error) {
        console.error('Error fetching positions:', error)
      }
    }

    fetchPositions()
  }, [])

  const handleSearch = () => {
    let filtered = positions

    if (filters.position) {
      filtered = filtered.filter(pos => 
        pos.title.toLowerCase().includes(filters.position.toLowerCase())
      )
    }

    if (filters.experience) {
      filtered = filtered.filter(pos => 
        pos.yearsOfExperience <= parseInt(filters.experience)
      )
    }

    if (filters.skills) {
      const searchSkills = filters.skills.toLowerCase().split(',').map(s => s.trim())
      filtered = filtered.filter(pos => 
        searchSkills.some(skill => 
          pos.requiredSkills.some(posSkill => 
            posSkill.toLowerCase().includes(skill)
          )
        )
      )
    }

    setFilteredPositions(filtered)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Interviewee Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Search AI-Generated Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <label htmlFor="position" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Position</label>
              <Input
                id="position"
                placeholder="e.g. Frontend Developer"
                value={filters.position}
                onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Experience Level</label>
              <Input
                id="experience"
                placeholder="e.g. 5"
                type="number"
                value={filters.experience}
                onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="skills" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Skills</label>
              <Input
                id="skills"
                placeholder="e.g. React, TypeScript"
                value={filters.skills}
                onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
              />
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
        {filteredPositions.map((position) => (
          <Card key={position.id}>
            <CardHeader>
              <CardTitle>{position.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  Experience: {position.yearsOfExperience} years
                </div>
                <div className="flex flex-wrap gap-2">
                  {position.requiredSkills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                  {position.requiredSkills.length > 3 && (
                    <Badge variant="secondary">+{position.requiredSkills.length - 3} more</Badge>
                  )}
                </div>
                {position.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{position.description}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/interviewee/${position.id}`}>View Details</Link>
              </Button>
              <Button>
                <Briefcase className="mr-2 h-4 w-4" /> Book ($19.99)
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

