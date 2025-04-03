
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authenticateAdmin, getAdminDemoPassword } from "@/utils/adminUtils";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (authenticateAdmin(password)) {
      onLoginSuccess();
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-20 px-4">
      <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-blue-700">Admin Login</CardTitle>
          <CardDescription>
            Access the employee pulse check submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter admin password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                For demo purposes, the password is: {getAdminDemoPassword()}
              </p>
            </div>
            <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
              Log In
            </Button>
            <div className="text-center mt-4">
              <Button 
                variant="link" 
                onClick={() => navigate("/")}
                className="text-sm text-blue-600"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
