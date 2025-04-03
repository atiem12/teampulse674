
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Submission } from "@/types/pulseCheck";
import { generateTextSummary } from "@/utils/textUtils";
import RadarChart from "./RadarChart";

interface ResponseSummariesTabProps {
  submission: Submission;
}

const ResponseSummariesTab = ({ submission }: ResponseSummariesTabProps) => {
  const openEndedResponsesRecord: Record<string, string> = {
    ...submission.openEndedResponses
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Response Visualization</CardTitle>
          <CardDescription>Visual representation of this submission's data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <RadarChart submission={submission} />
            </div>
            <div>
              <h3 className="text-md font-medium mb-3">Response Summaries</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Summary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Highlight</TableCell>
                    <TableCell>{generateTextSummary(openEndedResponsesRecord.highlight)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Challenge</TableCell>
                    <TableCell>{generateTextSummary(openEndedResponsesRecord.challenge)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Improvement</TableCell>
                    <TableCell>{generateTextSummary(openEndedResponsesRecord.improvement)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Recognition</TableCell>
                    <TableCell>{generateTextSummary(openEndedResponsesRecord.recognition)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Additional</TableCell>
                    <TableCell>{generateTextSummary(openEndedResponsesRecord.additional)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResponseSummariesTab;
