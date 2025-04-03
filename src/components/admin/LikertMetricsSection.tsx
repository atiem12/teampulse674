
import { Submission } from "@/types/pulseCheck";
import { calculateAverageScore, calculateOverallAverageScore } from "@/utils/submissionUtils";

interface LikertMetricsSectionProps {
  submissions: Submission[];
}

const LikertMetricsSection = ({ submissions }: LikertMetricsSectionProps) => {
  const overallAverage = calculateOverallAverageScore(submissions);

  return (
    <div className="bg-slate-50 p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Overall Likert Metrics</h3>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Total Average</div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-blue-700 mr-1">{overallAverage}</span>
            <span className="text-xs text-blue-500">/5</span>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Workload</div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold mr-1">{calculateAverageScore(submissions, "workload")}</span>
            <span className="text-xs text-muted-foreground">/5</span>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Support</div>
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
          <div className="text-sm text-muted-foreground mb-1">Growth</div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold mr-1">{calculateAverageScore(submissions, "growth")}</span>
            <span className="text-xs text-muted-foreground">/5</span>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Purpose</div>
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
