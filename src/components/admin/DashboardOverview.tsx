
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Submission } from "@/types/pulseCheck";
import { calculateAverageScore } from "@/utils/submissionUtils";
import TrendChart from "./TrendChart";
import ResponseDistributionChart from "./ResponseDistributionChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardOverviewProps {
  submissions: Submission[];
  onViewSubmission: (submission: Submission) => void;
}

const DashboardOverview = ({ submissions, onViewSubmission }: DashboardOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Visualizations</CardTitle>
        <CardDescription>
          Overall metrics from {submissions.length} total submissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1">
              <h3 className="text-sm font-medium">Average Scores (1-5)</h3>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Workload Satisfaction</span>
                  <span className="font-medium">{calculateAverageScore(submissions, "workload")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Team Support</span>
                  <span className="font-medium">{calculateAverageScore(submissions, "support")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Communication</span>
                  <span className="font-medium">{calculateAverageScore(submissions, "communication")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Growth Opportunities</span>
                  <span className="font-medium">{calculateAverageScore(submissions, "growth")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Purpose Clarity</span>
                  <span className="font-medium">{calculateAverageScore(submissions, "purpose")}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              {submissions.length > 0 && (
                <Tabs defaultValue="trends">
                  <TabsList className="w-full mb-2">
                    <TabsTrigger value="trends" className="flex-1">Trends</TabsTrigger>
                    <TabsTrigger value="distribution" className="flex-1">Distribution</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="trends" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="h-72">
                        <TrendChart 
                          submissions={submissions} 
                          dataKey="workload" 
                          title="Workload Satisfaction" 
                          color="#3b82f6"
                        />
                      </div>
                      <div className="h-72">
                        <TrendChart 
                          submissions={submissions} 
                          dataKey="support" 
                          title="Team Support" 
                          color="#10b981"
                        />
                      </div>
                      <div className="h-72">
                        <TrendChart 
                          submissions={submissions} 
                          dataKey="communication" 
                          title="Communication" 
                          color="#f59e0b"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="h-72">
                        <TrendChart 
                          submissions={submissions} 
                          dataKey="growth" 
                          title="Growth Opportunities" 
                          color="#8b5cf6"
                        />
                      </div>
                      <div className="h-72">
                        <TrendChart 
                          submissions={submissions} 
                          dataKey="purpose" 
                          title="Purpose Clarity" 
                          color="#ec4899"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="distribution" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="h-72">
                        <ResponseDistributionChart 
                          submissions={submissions} 
                          dataKey="workload" 
                          title="Workload Satisfaction" 
                          color="#3b82f6"
                        />
                      </div>
                      <div className="h-72">
                        <ResponseDistributionChart 
                          submissions={submissions} 
                          dataKey="support" 
                          title="Team Support" 
                          color="#10b981"
                        />
                      </div>
                      <div className="h-72">
                        <ResponseDistributionChart 
                          submissions={submissions} 
                          dataKey="communication" 
                          title="Communication" 
                          color="#f59e0b"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="h-72">
                        <ResponseDistributionChart 
                          submissions={submissions} 
                          dataKey="growth" 
                          title="Growth Opportunities" 
                          color="#8b5cf6"
                        />
                      </div>
                      <div className="h-72">
                        <ResponseDistributionChart 
                          submissions={submissions} 
                          dataKey="purpose" 
                          title="Purpose Clarity" 
                          color="#ec4899"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Recent Submissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {submissions.slice(0, 6).map((submission) => (
                <Button
                  key={submission.id}
                  variant="outline"
                  className="justify-start text-left"
                  onClick={() => onViewSubmission(submission)}
                >
                  <div className="flex justify-between w-full">
                    <span>Submission {submission.id.slice(-4)}</span>
                    <span className="text-xs text-gray-500">{submission.date}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardOverview;
