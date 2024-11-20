"use client";

import { useEffect, useState } from 'react';

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
  salary?: string;
  location?: string;
  employmentType?: string;
}

interface Props {
  positionId: string;
}

export default function PositionDetailsClient({ positionId }: Props) {
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await fetch(`/api/positions/${positionId}`);
        if (!response.ok) {
          throw new Error('Position not found');
        }
        const data = await response.json();
        setPosition(data);
      } catch (error) {
        console.error('Error fetching position:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosition();
  }, [positionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Position Not Found</h2>
          <p className="text-gray-500 mt-2">The position you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">{position.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4">
            {position.location && (
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {position.location}
              </div>
            )}
            {position.salary && (
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {position.salary}
              </div>
            )}
            {position.employmentType && (
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {position.employmentType}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Experience Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Experience Required</h2>
            <p className="mt-2 text-gray-600">{position.yearsOfExperience} years</p>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Required Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {position.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Interview Description</h2>
            <div className="mt-3 prose prose-blue max-w-none">
              <p className="text-gray-600 whitespace-pre-wrap">{position.description}</p>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            <div className="mt-3 flex flex-wrap gap-4">
              {position.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 
                           text-gray-700 rounded-lg transition duration-150 ease-in-out"
                >
                  {link.platform}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 