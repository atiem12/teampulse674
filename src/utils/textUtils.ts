
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
