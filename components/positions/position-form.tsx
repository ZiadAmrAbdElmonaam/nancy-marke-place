"use client";

import { useState } from "react";

interface SocialLink {
  platform: string;
  url: string;
}

export function PositionForm() {
  const [title, setTitle] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: "LinkedIn", url: "" },
    { platform: "GitHub", url: "" },
    { platform: "Twitter", url: "" }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty social links
    const filteredSocialLinks = socialLinks.filter(link => link.url.trim() !== "");
    
    const position = {
      title,
      yearsOfExperience: parseInt(yearsOfExperience),
      requiredSkills: requiredSkills.split(",").map(skill => skill.trim()),
      description,
      socialLinks: filteredSocialLinks
    };

    console.log("Sending position data:", position);

    try {
      const response = await fetch("/api/positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(position),
      });

      const result = await response.json();
      console.log("Response from server:", result);

      if (response.ok) {
        // Reset form
        setTitle("");
        setYearsOfExperience("");
        setRequiredSkills("");
        setDescription("");
        setSocialLinks([
          { platform: "LinkedIn", url: "" },
          { platform: "GitHub", url: "" },
          { platform: "Twitter", url: "" }
        ]);
        
        // Optionally refresh the page or update the list
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating position:", error);
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => 
      prev.map(link => 
        link.platform === platform ? { ...link, url: value } : link
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
        <input
          type="number"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Required Skills (comma-separated)</label>
        <input
          type="text"
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Social Links</label>
        {socialLinks.map((link) => (
          <div key={link.platform} className="flex items-center gap-2">
            <span className="w-20 text-sm">{link.platform}:</span>
            <input
              type="url"
              value={link.url}
              onChange={(e) => handleSocialLinkChange(link.platform, e.target.value)}
              placeholder={`Enter ${link.platform} URL`}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Position
      </button>
    </form>
  );
} 