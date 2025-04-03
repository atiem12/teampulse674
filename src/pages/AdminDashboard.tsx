
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

// Define types for our data
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

interface Submission {
  id: string;
  date: string;
  submittedAt: string;
  likertResponses: LikertResponses;
  openEndedResponses: OpenEndedResponses;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // For a real app, you would implement proper authentication
  // This is just a simple example
  const adminPassword = "admin123";

  useEffect(() => {
    // Check if admin is authenticated
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      loadSubmissions();
    }
  }, []);

  const loadSubmissions = () => {
    // Get submissions from localStorage
    const storedSubmissions = localStorage.getItem("pulseCheckSubmissions");
    if (storedSubmissions) {
      const parsedSubmissions = JSON.parse(storedSubmissions) as Submission[];
      // Sort by newest first
      parsedSubmissions.sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      setSubmissions(parsedSubmissions);
    }
  };

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      loadSubmissions();
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    setSelectedSubmission(null);
  };

  const calculateAverageScore = (key: keyof LikertResponses) => {
    if (submissions.length === 0) return 0;
    
    const total = submissions.reduce((sum, submission) => {
      const value = parseInt(submission.likertResponses[key]) || 0;
      return sum + value;
    }, 0);
    
    return (total / submissions.length).toFixed(1);
  };

  const viewSubmissionDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  // Convert numeric Likert responses to text for better readability
  const getLikertText = (value: string) => {
    const map: Record<string, string> = {
      "1": "Strongly Disagree",
      "2": "Disagree",
      "3": "Neutral",
      "4": "Agree",
      "5": "Strongly Agree"
    };
    return map[value] || "Not answered";
  };

  if (!isAuthenticated) {
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
                  For demo purposes, the password is: admin123
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
            <div className="col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>
                    {submissions.length} total submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Average Scores (1-5)</h3>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Workload Satisfaction</span>
                          <span className="font-medium">{calculateAverageScore("workload")}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Team Support</span>
                          <span className="font-medium">{calculateAverageScore("support")}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Communication</span>
                          <span className="font-medium">{calculateAverageScore("communication")}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Growth Opportunities</span>
                          <span className="font-medium">{calculateAverageScore("growth")}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Purpose Clarity</span>
                          <span className="font-medium">{calculateAverageScore("purpose")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {submissions.slice(0, 10).map((submission) => (
                      <Button
                        key={submission.id}
                        variant="outline"
                        className="w-full justify-start text-left"
                        onClick={() => viewSubmissionDetails(submission)}
                      >
                        <div className="flex justify-between w-full">
                          <span>Submission {submission.id.slice(-4)}</span>
                          <span className="text-xs text-gray-500">{submission.date}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1 lg:col-span-2">
              {selectedSubmission ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Submission Details</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSubmission(null)}
                      >
                        Back to List
                      </Button>
                    </div>
                    <CardDescription>
                      Submitted on {new Date(selectedSubmission.submittedAt).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="likert">
                      <TabsList className="mb-4">
                        <TabsTrigger value="likert">Likert Responses</TabsTrigger>
                        <TabsTrigger value="open-ended">Open-Ended Responses</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="likert" className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Question</TableHead>
                              <TableHead>Response</TableHead>
                              <TableHead>Score (1-5)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>I feel my current workload is manageable and sustainable.</TableCell>
                              <TableCell>{getLikertText(selectedSubmission.likertResponses.workload)}</TableCell>
                              <TableCell>{selectedSubmission.likertResponses.workload || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>I feel supported by my team and manager.</TableCell>
                              <TableCell>{getLikertText(selectedSubmission.likertResponses.support)}</TableCell>
                              <TableCell>{selectedSubmission.likertResponses.support || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Communication within my team has been clear and effective this week.</TableCell>
                              <TableCell>{getLikertText(selectedSubmission.likertResponses.communication)}</TableCell>
                              <TableCell>{selectedSubmission.likertResponses.communication || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>I see opportunities to learn and grow in my role.</TableCell>
                              <TableCell>{getLikertText(selectedSubmission.likertResponses.growth)}</TableCell>
                              <TableCell>{selectedSubmission.likertResponses.growth || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>I understand how my work contributes to our team's goals.</TableCell>
                              <TableCell>{getLikertText(selectedSubmission.likertResponses.purpose)}</TableCell>
                              <TableCell>{selectedSubmission.likertResponses.purpose || "N/A"}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TabsContent>
                      
                      <TabsContent value="open-ended" className="space-y-4">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium text-gray-800 mb-2">What was a highlight of your week?</h3>
                            <p className="p-3 bg-gray-50 rounded border">
                              {selectedSubmission.openEndedResponses.highlight || "No response provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800 mb-2">What was challenging for you this week?</h3>
                            <p className="p-3 bg-gray-50 rounded border">
                              {selectedSubmission.openEndedResponses.challenge || "No response provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800 mb-2">Is there something we could improve about how we work together?</h3>
                            <p className="p-3 bg-gray-50 rounded border">
                              {selectedSubmission.openEndedResponses.improvement || "No response provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800 mb-2">Is there someone who helped you this week that deserves recognition?</h3>
                            <p className="p-3 bg-gray-50 rounded border">
                              {selectedSubmission.openEndedResponses.recognition || "No response provided"}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800 mb-2">Is there anything else you'd like to share about your experience this week?</h3>
                            <p className="p-3 bg-gray-50 rounded border">
                              {selectedSubmission.openEndedResponses.additional || "No response provided"}
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Select a Submission</CardTitle>
                    <CardDescription>
                      Please select a submission from the list to view details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Avg. Likert Score</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map((submission) => {
                          // Calculate average Likert score for this submission
                          const scores = Object.values(submission.likertResponses)
                            .filter(score => score !== "")
                            .map(score => parseInt(score));
                          
                          const avgScore = scores.length > 0
                            ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
                            : "N/A";
                            
                          return (
                            <TableRow key={submission.id}>
                              <TableCell>#{submission.id.slice(-4)}</TableCell>
                              <TableCell>{submission.date}</TableCell>
                              <TableCell>{avgScore}</TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  onClick={() => viewSubmissionDetails(submission)}
                                >
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
