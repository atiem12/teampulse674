
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Submission } from "@/types/pulseCheck";
import { calculateSubmissionAverage } from "@/utils/submissionUtils";

interface SubmissionsListProps {
  submissions: Submission[];
  onViewSubmission: (submission: Submission) => void;
}

const SubmissionsList = ({ submissions, onViewSubmission }: SubmissionsListProps) => {
  return (
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
              const avgScore = calculateSubmissionAverage(submission);
                
              return (
                <TableRow key={submission.id}>
                  <TableCell>#{submission.id.slice(-4)}</TableCell>
                  <TableCell>{submission.date}</TableCell>
                  <TableCell>{avgScore}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => onViewSubmission(submission)}
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
  );
};

export default SubmissionsList;
