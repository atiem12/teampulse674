
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Submission } from "@/types/pulseCheck";
import LikertMetricsSection from "./LikertMetricsSection";
import VisualizationsTabs from "./VisualizationsTabs";
import RecentSubmissions from "./RecentSubmissions";

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
          {/* Likert Metrics Section */}
          <LikertMetricsSection submissions={submissions} />

          {/* Visualizations Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-3">
              <VisualizationsTabs submissions={submissions} />
            </div>
          </div>

          {/* Recent Submissions Section */}
          <RecentSubmissions submissions={submissions} onViewSubmission={onViewSubmission} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardOverview;
