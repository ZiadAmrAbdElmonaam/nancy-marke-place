// Define the Interview type
export interface Interview {
  id: string;
  scheduledAt: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  intervieweeId: string;
  interviewerId: string;
}

// Mock function to generate random dates within the next 30 days
const generateRandomDate = () => {
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + Math.floor(Math.random() * 30));
  return futureDate;
};

// Mock data generator
const generateMockInterviews = (): Interview[] => {
  return Array.from({ length: 6 }, (_, index) => ({
    id: `interview-${index + 1}`,
    scheduledAt: generateRandomDate(),
    status: ['scheduled', 'completed', 'cancelled'][Math.floor(Math.random() * 3)] as Interview['status'],
    intervieweeId: 'mock-interviewee-id',
    interviewerId: `interviewer-${Math.floor(Math.random() * 3) + 1}`,
  }));
};

// Mock API call to get interviews
export const getIntervieweeInterviews = async (): Promise<Interview[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data
  return generateMockInterviews();
};

// Function to get a single interview by ID
export const getInterviewById = async (id: string): Promise<Interview | null> => {
  const interviews = await getIntervieweeInterviews();
  return interviews.find(interview => interview.id === id) || null;
}; 