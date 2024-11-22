'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Image from 'next/image';

interface InterviewerProfile {
  id: string;
  userId: string;
  title: string;
  imageUrl: string | null | undefined;
  experience: number;
  description: string;
  country: string;
  company: string;
  linkedin: string | null | undefined;
  github: string | null | undefined;
  twitter: string | null | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function InterviewerProfileForm({
  existingProfile
}: {
  existingProfile: InterviewerProfile | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>(existingProfile?.imageUrl || '');

  const [formData, setFormData] = useState({
    title: existingProfile?.title || '',
    imageUrl: existingProfile?.imageUrl || '',
    experience: existingProfile?.experience || 0,
    description: existingProfile?.description || '',
    country: existingProfile?.country || '',
    company: existingProfile?.company || '',
    linkedin: existingProfile?.linkedin || '',
    github: existingProfile?.github || '',
    twitter: existingProfile?.twitter || '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Just create a preview URL for the UI
      const url = URL.createObjectURL(file);
      setPreview(url);
      // For now, we'll just use the file name as the imageUrl
      setFormData(prev => ({ ...prev, imageUrl: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/interviewer/profile', {
        method: existingProfile ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save profile');

      toast.success('Profile saved successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-2">Professional Title</label>
        <Input
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. Senior Software Engineer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Current Company</label>
        <Input
          required
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="e.g. Google, Meta, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Country</label>
        <Input
          required
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          placeholder="e.g. United States, Canada, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Profile Image</label>
        <div className="space-y-4">
          {preview && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image
                src={preview}
                alt="Profile preview"
                fill
                className="object-cover"
              />
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Years of Experience</label>
        <Input
          type="number"
          required
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Tell us about your experience and expertise..."
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
        <Input
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">GitHub Profile</label>
        <Input
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          placeholder="https://github.com/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Twitter Profile</label>
        <Input
          value={formData.twitter}
          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          placeholder="https://twitter.com/..."
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : (existingProfile ? 'Update Profile' : 'Create Profile')}
      </Button>
    </form>
  );
} 