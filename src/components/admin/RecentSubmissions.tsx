
import { Button } from "@/components/ui/button";
import { Submission } from "@/types/pulseCheck";

interface RecentSubmissionsProps {
  submissions: Submission[];
  onViewSubmission: (submission: Submission) => void;
}

const RecentSubmissions = ({ submissions, onViewSubmission }: RecentSubmissionsProps) => {
  return (
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
  );
};

export default RecentSubmissions;
