
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Submission } from "@/types/pulseCheck";
import { calculateAverageScore } from "@/utils/submissionUtils";
import AiInsights from "./AiInsights";

interface DashboardOverviewProps {
  submissions: Submission[];
  onViewSubmission: (submission: Submission) => void;
}

const DashboardOverview = ({ submissions, onViewSubmission }: DashboardOverviewProps) => {
  return (
    <div className="col-span-1">
      <AiInsights submissions={submissions} />
      
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
                onClick={() => onViewSubmission(submission)}
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
  );
};

export default DashboardOverview;
