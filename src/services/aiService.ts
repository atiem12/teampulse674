
/**
 * Service for AI-related functionality
 * Uses OpenAI API to generate insights
 */

import { Submission } from "@/types/pulseCheck";

// OpenAI API endpoint
const API_URL = "https://api.openai.com/v1/chat/completions";

// Function to get API key from localStorage
const getApiKey = (): string | null => {
  return localStorage.getItem("openai_api_key");
};

// Save API key to localStorage
export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem("openai_api_key", apiKey);
};

// Generate key insights from submissions
export const generateInsights = async (submissions: Submission[]): Promise<{ 
  keyPoints: string[], 
  recommendation: string 
} | null> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error("OpenAI API key not found");
    return null;
  }
  
  if (submissions.length === 0) {
    return {
      keyPoints: ["No submissions to analyze"],
      recommendation: "Wait for employee feedback to generate insights"
    };
  }
  
  try {
    // Extract all open-ended responses
    const allResponses = submissions.flatMap(submission => 
      Object.values(submission.openEndedResponses)
    ).filter(text => text && text.trim() !== '').join("\n\n");
    
    if (!allResponses) {
      return {
        keyPoints: ["No detailed responses to analyze"],
        recommendation: "Encourage employees to provide more detailed feedback"
      };
    }
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You analyze employee feedback and provide concise insights."
          },
          {
            role: "user",
            content: `Analyze these employee feedback responses and provide: 
            1. Three key themes/insights (each 1 sentence)
            2. One overall recommendation for leadership (1-2 sentences)
            
            Responses:
            ${allResponses.substring(0, 3000)}`
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    const aiResponse = data.choices[0]?.message.content;
    
    // Extract key points and recommendation
    const sections = aiResponse.split("\n\n");
    let keyPoints: string[] = [];
    let recommendation = "";
    
    if (sections.length >= 2) {
      // Extract key points
      const pointsSection = sections[0];
      keyPoints = pointsSection
        .split("\n")
        .filter(line => line.trim().startsWith("-") || line.trim().match(/^\d+\./))
        .map(point => point.replace(/^[^a-zA-Z]+/, "").trim())
        .filter(point => point.length > 0);
      
      // Extract recommendation
      recommendation = sections[sections.length - 1]
        .replace(/^recommendation:?\s*/i, "")
        .trim();
    }
    
    return {
      keyPoints: keyPoints.length > 0 ? keyPoints : ["Could not extract key points from AI response"],
      recommendation: recommendation || "Could not extract recommendation from AI response"
    };
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return {
      keyPoints: ["Error generating insights"],
      recommendation: "Try again later or check your API key"
    };
  }
};
