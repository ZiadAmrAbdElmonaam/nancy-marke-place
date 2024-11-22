'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, DollarSign, Briefcase, Clock, ExternalLink } from 'lucide-react'

interface SocialLink {
  id: string
  platform: string
  url: string
}

interface Position {
  id: string
  title: string
  yearsOfExperience: number
  requiredSkills: string[]
  description: string
  socialLinks: SocialLink[]
  salary?: string
  location?: string
  employmentType?: string
}

interface Props {
  positionId: string
}

export default function PositionDetailsPage({ positionId }: Props) {
  const [position, setPosition] = useState<Position | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await fetch(`/api/positions/${positionId}`)
        if (!response.ok) {
          throw new Error('Position not found')
        }
        const data = await response.json()
        setPosition(data)
      } catch (error) {
        console.error('Error fetching position:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosition()
  }, [positionId])

  if (loading) {
    return <PositionDetailsSkeleton />
  }

  if (!position) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Position Not Found</CardTitle>
          <CardDescription>The position you&apos;re looking for doesn&apos;t exist or has been removed.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{position.title}</CardTitle>
          <CardDescription>
            <div className="flex flex-wrap gap-4 mt-2">
              {position.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  {position.location}
                </div>
              )}
              {position.salary && (
                <div className="flex items-center text-sm">
                  <DollarSign className="mr-2 h-4 w-4" />
                  {position.salary}
                </div>
              )}
              {position.employmentType && (
                <div className="flex items-center text-sm">
                  <Briefcase className="mr-2 h-4 w-4" />
                  {position.employmentType}
                </div>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Experience Required</h2>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4" />
              {position.yearsOfExperience} years
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {position.requiredSkills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Interview Description</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{position.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <div className="flex flex-wrap gap-4">
              {position.socialLinks.map((link) => (
                <Button key={link.id} variant="outline" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.platform}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Briefcase className="mr-2 h-4 w-4" /> Book Interview ($19.99)
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function PositionDetailsSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  )
}

