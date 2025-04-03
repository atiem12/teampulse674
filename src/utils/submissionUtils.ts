
import { Submission } from "../types/pulseCheck";

export const loadSubmissions = (): Submission[] => {
  // Get submissions from localStorage
  const storedSubmissions = localStorage.getItem("pulseCheckSubmissions");
  if (storedSubmissions) {
    const parsedSubmissions = JSON.parse(storedSubmissions) as Submission[];
    // Sort by newest first
    parsedSubmissions.sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    return parsedSubmissions;
  }
  return [];
};

export const calculateAverageScore = (
  submissions: Submission[],
  key: keyof Submission["likertResponses"]
): string => {
  if (submissions.length === 0) return "0";
  
  const total = submissions.reduce((sum, submission) => {
    const value = parseInt(submission.likertResponses[key]) || 0;
    return sum + value;
  }, 0);
  
  return (total / submissions.length).toFixed(1);
};

// Calculate the overall average score across all Likert questions
export const calculateOverallAverageScore = (submissions: Submission[]): string => {
  if (submissions.length === 0) return "0";
  
  const categories: (keyof Submission["likertResponses"])[] = ["workload", "support", "communication", "growth", "purpose"];
  
  const total = submissions.reduce((sum, submission) => {
    let submissionTotal = 0;
    let answeredCount = 0;
    
    categories.forEach(category => {
      const value = parseInt(submission.likertResponses[category]) || 0;
      if (value > 0) {
        submissionTotal += value;
        answeredCount++;
      }
    });
    
    return sum + (answeredCount > 0 ? submissionTotal / answeredCount : 0);
  }, 0);
  
  return (total / submissions.length).toFixed(1);
};

// Convert numeric Likert responses to text for better readability
export const getLikertText = (value: string): string => {
  const map: Record<string, string> = {
    "1": "Strongly Disagree",
    "2": "Disagree",
    "3": "Neutral",
    "4": "Agree",
    "5": "Strongly Agree"
  };
  return map[value] || "Not answered";
};

export const calculateSubmissionAverage = (submission: Submission): string => {
  const scores = Object.values(submission.likertResponses)
    .filter(score => score !== "")
    .map(score => parseInt(score));
  
  return scores.length > 0
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
    : "N/A";
};
