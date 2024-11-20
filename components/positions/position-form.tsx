"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const PositionForm = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      
      const data = {
        title: formData.get("title")?.toString() || "",
        yearsOfExperience: parseInt(formData.get("yearsOfExperience") as string) || 0,
        requiredSkills: formData.get("requiredSkills")?.toString().split(",").map(s => s.trim()) || [],
        description: formData.get("description")?.toString() || "",
      };

      // Validate data
      if (!data.title || !data.yearsOfExperience || data.requiredSkills.length === 0) {
        toast.error("Please fill in all required fields");
        return;
      }

      console.log("Submitting data:", data);

      const response = await fetch("/api/positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create position");
      }

      const result = await response.json();
      console.log("Success:", result);
      
      toast.success("Position created successfully!");
      
      // Reset form using the ref
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error creating position:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
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
          min="0"
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
      <Button 
        type="submit" 
        disabled={loading}
        className="w-full"
      >
        {loading ? "Creating..." : "Create Position"}
      </Button>
    </form>
  );
}; 