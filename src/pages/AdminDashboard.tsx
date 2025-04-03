
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Submission } from "@/types/pulseCheck";
import { isAdminAuthenticated, logoutAdmin } from "@/utils/adminUtils";
import { loadSubmissions } from "@/utils/submissionUtils";
import AdminLogin from "@/components/admin/AdminLogin";
import DashboardOverview from "@/components/admin/DashboardOverview";
import SubmissionDetails from "@/components/admin/SubmissionDetails";
import SubmissionsList from "@/components/admin/SubmissionsList";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chartView, setChartView] = useState<"trends" | "distribution">("trends");

  useEffect(() => {
    // Check if admin is authenticated
    if (isAdminAuthenticated()) {
      setIsAuthenticated(true);
      loadSubmissionsData();
    }
  }, []);

  const loadSubmissionsData = () => {
    const loadedSubmissions = loadSubmissions();
    setSubmissions(loadedSubmissions);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    loadSubmissionsData();
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setSelectedSubmission(null);
  };

  const viewSubmissionDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pulse Check Admin Dashboard</h1>
          <div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="mr-2"
            >
              Home
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {submissions.length === 0 ? (
          <Card className="my-8 text-center p-8">
            <CardContent>
              <p className="text-gray-600">
                No submissions found. Employees have not submitted any pulse checks yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DashboardOverview 
              submissions={submissions} 
              onViewSubmission={viewSubmissionDetails} 
            />

            <div className="col-span-1 lg:col-span-2">
              {selectedSubmission ? (
                <SubmissionDetails 
                  submission={selectedSubmission} 
                  onBack={() => setSelectedSubmission(null)} 
                />
              ) : (
                <SubmissionsList 
                  submissions={submissions} 
                  onViewSubmission={viewSubmissionDetails} 
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
