
// Simple utility to get current date in YYYY-MM-DD format
export const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// This function is needed by PulseCheck.tsx
export const getCurrentFormattedDate = () => {
  return getCurrentDate();
};
