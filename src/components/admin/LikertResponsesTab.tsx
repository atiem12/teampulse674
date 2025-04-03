
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Submission } from "@/types/pulseCheck";
import { getLikertText } from "@/utils/submissionUtils";

interface LikertResponsesTabProps {
  submission: Submission;
}

const LikertResponsesTab = ({ submission }: LikertResponsesTabProps) => {
  return (
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
          <TableCell>{getLikertText(submission.likertResponses.workload)}</TableCell>
          <TableCell>{submission.likertResponses.workload || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>I feel supported by my team and manager.</TableCell>
          <TableCell>{getLikertText(submission.likertResponses.support)}</TableCell>
          <TableCell>{submission.likertResponses.support || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Communication within my team has been clear and effective this week.</TableCell>
          <TableCell>{getLikertText(submission.likertResponses.communication)}</TableCell>
          <TableCell>{submission.likertResponses.communication || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>I see opportunities to learn and grow in my role.</TableCell>
          <TableCell>{getLikertText(submission.likertResponses.growth)}</TableCell>
          <TableCell>{submission.likertResponses.growth || "N/A"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>I understand how my work contributes to our team's goals.</TableCell>
          <TableCell>{getLikertText(submission.likertResponses.purpose)}</TableCell>
          <TableCell>{submission.likertResponses.purpose || "N/A"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default LikertResponsesTab;
