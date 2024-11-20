'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Interviewee Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl mb-4">Search AI-Generated Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input
            placeholder="Position (e.g. Frontend Developer)"
            value={filters.position}
            onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
          />
          <Input
            placeholder="Experience Level (e.g. 5)"
            type="number"
            value={filters.experience}
            onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
          />
          <Input
            placeholder="Skills (e.g. React, TypeScript)"
            value={filters.skills}
            onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPositions.map((position) => (
          <div key={position.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-lg">{position.title}</h3>
            <p className="text-sm text-gray-600 mt-2">
              Experience: {position.yearsOfExperience} years
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Skills: {position.requiredSkills.join(", ")}
            </p>
            {position.description && (
              <p className="text-sm mt-2">{position.description}</p>
            )}
            <div className="mt-4 flex justify-between items-center">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button size="sm">
                Book ($19.99)
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 