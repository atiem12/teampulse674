
import { Submission, LikertResponses, OpenEndedResponses } from "@/types/pulseCheck";

export const savePulseCheckSubmission = (
  likertResponses: LikertResponses,
  openEndedResponses: OpenEndedResponses,
  getCurrentDate: () => string
): Submission => {
  // Create a submission object with all responses and metadata
  const submission: Submission = {
    id: Date.now().toString(), // Simple unique ID based on timestamp
    date: getCurrentDate(),
    submittedAt: new Date().toISOString(),
    likertResponses,
    openEndedResponses
  };

  // Get existing submissions from localStorage or initialize empty array
  const existingSubmissions: Submission[] = JSON.parse(localStorage.getItem('pulseCheckSubmissions') || '[]');
  
  // Add new submission to the array
  const updatedSubmissions = [...existingSubmissions, submission];
  
  // Save updated array back to localStorage
  localStorage.setItem('pulseCheckSubmissions', JSON.stringify(updatedSubmissions));
  
  return submission;
};
