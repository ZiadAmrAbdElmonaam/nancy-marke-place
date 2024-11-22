/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  country: z.string().min(1, "Country is required"),
  experience: z.number().min(0, "Experience must be a positive number"),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
})

type ProfileFormValues = z.infer<typeof formSchema>

interface ProfileFormProps {
  existingProfile: ProfileFormValues | null
}

export default function InterviewerProfileForm({ existingProfile }: ProfileFormProps) {
  const router = useRouter()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: existingProfile || {
      name: "",
      company: "",
      position: "",
      country: "",
      experience: 0,
      linkedin: "",
      github: "",
      twitter: "",
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const endpoint = existingProfile ? '/api/interviewer/profile' : '/api/interviewer/profile'
      const method = existingProfile ? 'PUT' : 'POST'
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      toast.success(existingProfile ? 'Profile updated!' : 'Profile created!')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Your company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Your position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Years of experience"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Your country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your LinkedIn URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your GitHub URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Your Twitter URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {existingProfile ? 'Update Profile' : 'Create Profile'}
        </Button>
      </form>
    </Form>
  )
} 