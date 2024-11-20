"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const PositionForm = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      
      const data = {
        title: formData.get("title"),
        yearsOfExperience: parseInt(formData.get("yearsOfExperience") as string),
        requiredSkills: formData.get("requiredSkills")?.toString().split(","),
        description: formData.get("description"),
      };

      const response = await fetch("/api/positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create position");
      }

      toast.success("Position created successfully!");
      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Input
          name="title"
          placeholder="Position Title"
          required
        />
      </div>
      <div>
        <Input
          name="yearsOfExperience"
          type="number"
          placeholder="Years of Experience Required"
          required
        />
      </div>
      <div>
        <Input
          name="requiredSkills"
          placeholder="Required Skills (comma-separated)"
          required
        />
      </div>
      <div>
        <Textarea
          name="description"
          placeholder="Position Description"
          rows={4}
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Position"}
      </Button>
    </form>
  );
}; 