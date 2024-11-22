"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string().url({ message: "Please enter a valid URL" }).optional(),
})

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  yearsOfExperience: z.number().min(0, { message: "Years of experience must be a positive number" }),
  requiredSkills: z.string().min(2, { message: "Please enter at least one skill" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  socialLinks: z.array(socialLinkSchema),
})

export function PositionForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      yearsOfExperience: 0,
      requiredSkills: "",
      description: "",
      socialLinks: [
        { platform: "LinkedIn", url: "" },
        { platform: "GitHub", url: "" },
        { platform: "Twitter", url: "" },
      ],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/positions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          requiredSkills: values.requiredSkills.split(",").map(skill => skill.trim()),
          socialLinks: values.socialLinks.filter(link => link.url),
        }),
      })

      if (response.ok) {
        toast({
          title: "Position created",
          description: "Your new interview position has been created successfully.",
        })
        form.reset()
        router.refresh()
      } else {
        throw new Error("Failed to create position")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating the position.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter position title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requiredSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills</FormLabel>
              <FormControl>
                <Input placeholder="Enter skills, separated by commas" {...field} />
              </FormControl>
              <FormDescription>Enter skills separated by commas, e.g. &quot;React, Node.js, TypeScript&quot;</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter position description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("socialLinks").map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`socialLinks.${index}.url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{form.watch(`socialLinks.${index}.platform`)} URL</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter ${form.watch(`socialLinks.${index}.platform`)} URL`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Create Position</Button>
      </form>
    </Form>
  )
}

