'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useParams } from 'next/navigation'

interface Interview {
  id: number
  position: string
  experience: string
  skills: string[]
  description?: string
  interviewer?: {
    name: string
    title: string
    company: string
    yearsOfExperience: number
    socialLinks: {
      linkedin?: string
      twitter?: string
      facebook?: string
    }
  }
}

export default function InterviewDetails() {
  const params = useParams()
  const [interview, setInterview] = useState<Interview | null>(null)

  useEffect(() => {
    const mockInterview: Interview = {
      id: Number(params.id),
      position: 'Frontend Developer',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      description: 'This interview focuses on modern frontend development practices and React ecosystem.',
      interviewer: {
        name: 'John Smith',
        title: 'Senior Frontend Engineer',
        company: 'Tech Solutions Inc.',
        yearsOfExperience: 8,
        socialLinks: {
          linkedin: 'https://linkedin.com/in/johnsmith',
          twitter: 'https://twitter.com/johnsmith',
          facebook: 'https://facebook.com/johnsmith'
        }
      }
    }
    setInterview(mockInterview)
  }, [params.id])

  if (!interview) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Interview #{interview.id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Interviewer Information */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-3">Your Interviewer</h3>
            <div className="space-y-1">
              <p><span className="font-medium">Name:</span> {interview.interviewer?.name}</p>
              <p><span className="font-medium">Title:</span> {interview.interviewer?.title}</p>
              <p><span className="font-medium">Company:</span> {interview.interviewer?.company}</p>
              <p><span className="font-medium">Experience:</span> {interview.interviewer?.yearsOfExperience} years</p>
              <div className="pt-3">
                <p className="font-medium mb-2">Connect with {interview.interviewer?.name.split(' ')[0]}:</p>
                <div className="flex items-center gap-4">
                  {interview.interviewer?.socialLinks.linkedin && (
                    <a 
                      href={interview.interviewer.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
                    >
                      LinkedIn
                    </a>
                  )}
                  {interview.interviewer?.socialLinks.linkedin && interview.interviewer?.socialLinks.twitter && (
                    <span className="text-gray-300">|</span>
                  )}
                  {interview.interviewer?.socialLinks.twitter && (
                    <a 
                      href={interview.interviewer.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
                    >
                      Twitter
                    </a>
                  )}
                  {interview.interviewer?.socialLinks.twitter && interview.interviewer?.socialLinks.facebook && (
                    <span className="text-gray-300">|</span>
                  )}
                  {interview.interviewer?.socialLinks.facebook && (
                    <a 
                      href={interview.interviewer.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
                    >
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interview Description */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-3">Interview Overview</h3>
            <p className="text-gray-700">{interview.description}</p>
          </div>

          {/* Position Details */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-3">Position Requirements</h3>
            <div className="space-y-1">
              <p><span className="font-medium">Position:</span> {interview.position}</p>
              <p><span className="font-medium">Experience Required:</span> {interview.experience}</p>
              <p><span className="font-medium">Required Skills:</span> {interview.skills.join(', ')}</p>
            </div>
          </div>

          {/* Actions */}
            <Button>Book Interview ($19.99)</Button>
        </CardContent>
      </Card>
    </div>
  )
} 