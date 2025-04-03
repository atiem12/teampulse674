
import { Submission } from "@/types/pulseCheck";

interface OpenEndedResponsesTabProps {
  submission: Submission;
}

const OpenEndedResponsesTab = ({ submission }: OpenEndedResponsesTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-800 mb-2">What was a highlight of your month?</h3>
        <p className="p-3 bg-gray-50 rounded border">
          {submission.openEndedResponses.highlight || "No response provided"}
        </p>
      </div>
      <div>
        <h3 className="font-medium text-gray-800 mb-2">What was challenging for you this month?</h3>
        <p className="p-3 bg-gray-50 rounded border">
          {submission.openEndedResponses.challenge || "No response provided"}
        </p>
      </div>
      <div>
        <h3 className="font-medium text-gray-800 mb-2">Is there something we could improve about how we work together?</h3>
        <p className="p-3 bg-gray-50 rounded border">
          {submission.openEndedResponses.improvement || "No response provided"}
        </p>
      </div>
      <div>
        <h3 className="font-medium text-gray-800 mb-2">Is there someone who helped you this month that deserves recognition?</h3>
        <p className="p-3 bg-gray-50 rounded border">
          {submission.openEndedResponses.recognition || "No response provided"}
        </p>
      </div>
      <div>
        <h3 className="font-medium text-gray-800 mb-2">Is there anything else you'd like to share about your experience this month?</h3>
        <p className="p-3 bg-gray-50 rounded border">
          {submission.openEndedResponses.additional || "No response provided"}
        </p>
      </div>
    </div>
  );
};

export default OpenEndedResponsesTab;
