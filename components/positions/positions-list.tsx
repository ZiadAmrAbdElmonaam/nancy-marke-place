import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'

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
  createdAt: string
  updatedAt: string
}

async function getPositions(): Promise<Position[]> {
  const res = await fetch('http://localhost:3000/api/positions', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch positions')
  return res.json()
}

export async function PositionsList() {
  const positions = await getPositions()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {positions.map((position) => (
        <Card key={position.id}>
          <CardHeader>
            <CardTitle>{position.title}</CardTitle>
            <CardDescription>Experience: {position.yearsOfExperience} years</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{position.description}</p>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {position.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Social Links:</h4>
              <div className="flex flex-wrap gap-2">
                {position.socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    {link.platform}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Created: {new Date(position.createdAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

