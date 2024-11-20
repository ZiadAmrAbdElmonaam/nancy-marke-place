'use client'

import { PositionForm } from "@/components/positions/position-form";
import { useEffect, useState } from "react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface Position {
  id: string;
  title: string;
  yearsOfExperience: number;
  requiredSkills: string[];
  description: string;
  socialLinks: SocialLink[];
  createdAt: string;
  updatedAt: string;
}

export default function InterviewerDashboard() {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    // Fetch positions when component mounts
    fetch('/api/positions')
      .then(res => res.json())
      .then(data => setPositions(data))
      .catch(error => console.error('Error fetching positions:', error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Interviewer Dashboard</h1>
      
      {/* Create New Position Form */}
      <div className="max-w-2xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Interview</h2>
        <PositionForm />
      </div>

      {/* Positions List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Existing Positions</h2>
        <div className="grid gap-4">
          {positions.map((position) => (
            <div key={position.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold">{position.title}</h3>
              <p className="text-gray-600">Experience: {position.yearsOfExperience} years</p>
              <p className="text-gray-600">Description: {position.description}</p>
              
              {/* Skills */}
              <div className="mt-2">
                <h4 className="font-medium">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {position.requiredSkills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-2">
                <h4 className="font-medium">Social Links:</h4>
                <div className="flex flex-wrap gap-2">
                  {position.socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                    >
                      {link.platform}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-500">
                Created: {new Date(position.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 