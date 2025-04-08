
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
        <CardContent className="pt-4">
          <div className="h-80 w-full">
            <RadarChart submission={submission} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Response Summaries</CardTitle>
          <CardDescription>Quick overview of open-ended responses</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ResponseSummariesTab;
