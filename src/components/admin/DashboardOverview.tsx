
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Submission } from "@/types/pulseCheck";
import { calculateAverageScore, calculateOverallAverageScore } from "@/utils/submissionUtils";
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
          {/* Overall Likert Metrics with Total Average */}
          <div className="bg-slate-50 p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Overall Likert Metrics</h3>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
                <div className="text-sm text-blue-600 font-medium mb-1">Total Average</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-blue-700 mr-1">{calculateOverallAverageScore(submissions)}</span>
                  <span className="text-xs text-blue-500">/5</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-white rounded-lg border shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Workload Satisfaction</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold mr-1">{calculateAverageScore(submissions, "workload")}</span>
                  <span className="text-xs text-muted-foreground">/5</span>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Team Support</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold mr-1">{calculateAverageScore(submissions, "support")}</span>
                  <span className="text-xs text-muted-foreground">/5</span>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Communication</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold mr-1">{calculateAverageScore(submissions, "communication")}</span>
                  <span className="text-xs text-muted-foreground">/5</span>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Growth Opportunities</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold mr-1">{calculateAverageScore(submissions, "growth")}</span>
                  <span className="text-xs text-muted-foreground">/5</span>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Purpose Clarity</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold mr-1">{calculateAverageScore(submissions, "purpose")}</span>
                  <span className="text-xs text-muted-foreground">/5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Removed the average scores section from here and kept only the visualization parts */}
            <div className="lg:col-span-3">
              {submissions.length > 0 && (
                <Tabs defaultValue="trends">
                  <TabsList className="w-full mb-2">
                    <TabsTrigger value="trends" className="flex-1">Trends</TabsTrigger>
                    <TabsTrigger value="distribution" className="flex-1">Distribution</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="trends" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="h-72">
                        <TrendChart 
                          submissions={submissions} 
                          dataKey="communication" 
                          title="Communication" 
                          color="#f59e0b"
                        />
                      </div>
                      <div className="h-72">
                        <TrendChart 
                          submissions={submissions} 
                          dataKey="growth" 
                          title="Growth Opportunities" 
                          color="#8b5cf6"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="h-72">
                        <ResponseDistributionChart 
                          submissions={submissions} 
                          dataKey="communication" 
                          title="Communication" 
                          color="#f59e0b"
                        />
                      </div>
                      <div className="h-72">
                        <ResponseDistributionChart 
                          submissions={submissions} 
                          dataKey="growth" 
                          title="Growth Opportunities" 
                          color="#8b5cf6"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
