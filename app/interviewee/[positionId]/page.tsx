"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Position {
  id: string;
  title: string;
  yearsOfExperience: number;
  requiredSkills: string[];
  description: string | null;
  interviewerId: string;
  createdAt: string;
}

interface Interviewer {
  name: string;
  socialMedia: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  expertise: string[];
}

export default function PositionDetails({ 
  params 
}: { 
  params: { positionId: string } 
}) {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositionDetails = async () => {
      try {
        const response = await fetch(`/api/positions/${params.positionId}`);
        if (!response.ok) throw new Error('Failed to fetch position details');
        const data = await response.json();
        setPosition(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositionDetails();
  }, [params.positionId]);

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (!position) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Position not found</h1>
        <Link href="/interviewee/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Mock interviewer data (replace with real data from your database)
  const interviewer: Interviewer = {
    name: "John Doe",
    socialMedia: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe"
    },
    expertise: ["System Design", "Algorithms", "Web Development"]
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/interviewee/dashboard">
          <Button variant="outline" className="mb-4">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Position Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">{position.title}</h1>
            <div className="space-y-4">
              <p className="text-gray-600">
                <span className="font-semibold">Experience Required:</span>{" "}
                {position.yearsOfExperience} years
              </p>
              <div>
                <span className="font-semibold">Required Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {position.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {position.description && (
                <div>
                  <span className="font-semibold">Description:</span>
                  <p className="mt-2 text-gray-600">{position.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interviewer Profile */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Interviewer Profile</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{interviewer.name}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Social Media</h3>
              <div className="space-y-2">
                {Object.entries(interviewer.socialMedia).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 block"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {interviewer.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Button className="w-full mt-6">
            Book Interview ($19.99)
          </Button>
        </div>
      </div>
    </div>
  );
} 