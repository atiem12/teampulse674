
/**
 * Generates a simplified summary of a longer text
 * This creates a summary by truncating the text and extracting key points
 */
export const generateTextSummary = (text: string, maxLength: number = 100): string => {
  if (!text || text.trim() === '') {
    return 'No response provided';
  }
  
  // For short texts, just return them as is
  if (text.length <= maxLength) {
    return text;
  }
  
  // Truncate the text and add ellipsis
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Uses AI to analyze text and extract key points
 * @param text The text to analyze
 * @returns An array of key points extracted from the text
 */
export const extractKeyPoints = (text: string): string[] => {
  if (!text || text.trim() === '') {
    return ['No response provided'];
  }

  // This is a simple implementation that extracts sentences
  // In a real implementation, this would call an AI API
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  
  // For simplicity, let's just return the first 2 sentences as key points
  // In a real implementation, this would use AI to identify truly important points
  return sentences.slice(0, 2).map(s => s.trim());
};

/**
 * Uses AI to generate recommendations based on the provided text
 * @param text The text containing feedback/concerns to address
 * @returns A recommendation to address the concerns in the text
 */
export const generateRecommendation = (text: string): string => {
  if (!text || text.trim() === '') {
    return 'No concerns to address';
  }

  // This is a mock implementation - in a real app, you would call an API
  // For now, we'll use simple heuristics to generate recommendations
  
  const lowercaseText = text.toLowerCase();
  
  if (lowercaseText.includes('workload') || lowercaseText.includes('busy') || 
      lowercaseText.includes('stress') || lowercaseText.includes('pressure')) {
    return 'Consider redistributing workload or providing additional resources to alleviate pressure.';
  }
  
  if (lowercaseText.includes('communication') || lowercaseText.includes('unclear') || 
      lowercaseText.includes('confusion') || lowercaseText.includes('informed')) {
    return 'Improve team communication channels and establish regular check-ins to ensure everyone is informed.';
  }
  
  if (lowercaseText.includes('support') || lowercaseText.includes('help') || 
      lowercaseText.includes('guidance') || lowercaseText.includes('alone')) {
    return 'Provide additional mentoring and support structures to ensure team members feel supported.';
  }
  
  if (lowercaseText.includes('recognition') || lowercaseText.includes('appreciate') || 
      lowercaseText.includes('valued') || lowercaseText.includes('effort')) {
    return 'Implement more consistent recognition practices to acknowledge team members' contributions.';
  }
  
  // Default recommendation if no specific patterns are matched
  return 'Consider scheduling a follow-up conversation to better understand and address the concerns raised.';
};

/**
 * Analyzes a full submission to generate overall recommendations
 * @param openEndedResponses The open-ended responses to analyze
 * @returns An overall recommendation based on all responses
 */
export const generateOverallRecommendation = (
  openEndedResponses: Record<string, string>
): string => {
  // Combine all responses to get a comprehensive view
  const allResponses = Object.values(openEndedResponses).join(' ');
  
  // Generate a more comprehensive recommendation based on all responses
  // In a real implementation, this would use more sophisticated AI analysis
  return generateRecommendation(allResponses);
};
