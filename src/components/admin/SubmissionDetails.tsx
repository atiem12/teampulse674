
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Submission } from "@/types/pulseCheck";
import LikertResponsesTab from "./LikertResponsesTab";
import OpenEndedResponsesTab from "./OpenEndedResponsesTab";
import ResponseSummariesTab from "./ResponseSummariesTab";
import AIAnalysisTab from "./AIAnalysisTab";

interface SubmissionDetailsProps {
  submission: Submission;
  onBack: () => void;
}

const SubmissionDetails = ({ submission, onBack }: SubmissionDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Submission Details</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onBack}
          >
            Back to List
          </Button>
        </div>
        <CardDescription>
          Submitted on {new Date(submission.submittedAt).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="likert">
          <TabsList className="mb-4">
            <TabsTrigger value="likert">Likert Responses</TabsTrigger>
            <TabsTrigger value="open-ended">Open-Ended Responses</TabsTrigger>
            <TabsTrigger value="summaries">Response Summaries</TabsTrigger>
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="likert" className="space-y-4">
            <LikertResponsesTab submission={submission} />
          </TabsContent>
          
          <TabsContent value="open-ended" className="space-y-4">
            <OpenEndedResponsesTab submission={submission} />
          </TabsContent>
          
          <TabsContent value="summaries" className="space-y-4">
            <ResponseSummariesTab submission={submission} />
          </TabsContent>
          
          <TabsContent value="ai-analysis" className="space-y-6">
            <AIAnalysisTab submission={submission} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SubmissionDetails;
