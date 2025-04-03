
import { Submission } from "@/types/pulseCheck";
import { calculateAverageScore, calculateOverallAverageScore } from "@/utils/submissionUtils";

interface LikertMetricsSectionProps {
  submissions: Submission[];
}

const LikertMetricsSection = ({ submissions }: LikertMetricsSectionProps) => {
  return (
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
  );
};

export default LikertMetricsSection;
