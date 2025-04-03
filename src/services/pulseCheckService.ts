
interface LikertResponses {
  workload: string;
  support: string;
  communication: string;
  growth: string;
  purpose: string;
}

interface OpenEndedResponses {
  highlight: string;
  challenge: string;
  improvement: string;
  recognition: string;
  additional: string;
}

export interface PulseCheckSubmission {
  id: string;
  date: string;
  submittedAt: string;
  likertResponses: LikertResponses;
  openEndedResponses: OpenEndedResponses;
}

export const savePulseCheckSubmission = (
  likertResponses: LikertResponses,
  openEndedResponses: OpenEndedResponses,
  getCurrentDate: () => string
): PulseCheckSubmission => {
  // Create a submission object with all responses and metadata
  const submission: PulseCheckSubmission = {
    id: Date.now().toString(), // Simple unique ID based on timestamp
    date: getCurrentDate(),
    submittedAt: new Date().toISOString(),
    likertResponses,
    openEndedResponses
  };

  // Get existing submissions from localStorage or initialize empty array
  const existingSubmissions: PulseCheckSubmission[] = JSON.parse(localStorage.getItem('pulseCheckSubmissions') || '[]');
  
  // Add new submission to the array
  const updatedSubmissions = [...existingSubmissions, submission];
  
  // Save updated array back to localStorage
  localStorage.setItem('pulseCheckSubmissions', JSON.stringify(updatedSubmissions));
  
  return submission;
};
