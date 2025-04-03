
// Simple utility functions for admin authentication

// For a real app, you would implement proper authentication
// This is just a simple example
const ADMIN_PASSWORD = "admin123";
const ADMIN_AUTH_KEY = "adminAuthenticated";

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
};

export const authenticateAdmin = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_AUTH_KEY, "true");
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(ADMIN_AUTH_KEY);
};

export const getAdminDemoPassword = (): string => {
  return ADMIN_PASSWORD;
};
