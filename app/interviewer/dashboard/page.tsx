'use client'

import { PositionForm } from "@/components/positions/position-form";

export default function InterviewerDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Interviewer Dashboard</h1>
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Create New Position</h2>
        <PositionForm />
      </div>
    </div>
  );
} 