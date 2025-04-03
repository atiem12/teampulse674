
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Submission } from "@/types/pulseCheck";
import { getLikertText } from "@/utils/submissionUtils";
import { 
  generateTextSummary, 
  extractKeyPoints, 
  generateRecommendation,
  generateOverallRecommendation
} from "@/utils/textUtils";

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
          </TabsContent>
          
          <TabsContent value="open-ended" className="space-y-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">What was a highlight of your week?</h3>
                <p className="p-3 bg-gray-50 rounded border">
                  {submission.openEndedResponses.highlight || "No response provided"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">What was challenging for you this week?</h3>
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
                <h3 className="font-medium text-gray-800 mb-2">Is there someone who helped you this week that deserves recognition?</h3>
                <p className="p-3 bg-gray-50 rounded border">
                  {submission.openEndedResponses.recognition || "No response provided"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Is there anything else you'd like to share about your experience this week?</h3>
                <p className="p-3 bg-gray-50 rounded border">
                  {submission.openEndedResponses.additional || "No response provided"}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="summaries" className="space-y-4">
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
                      <TableCell>{generateTextSummary(submission.openEndedResponses.highlight)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Challenge</TableCell>
                      <TableCell>{generateTextSummary(submission.openEndedResponses.challenge)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Improvement</TableCell>
                      <TableCell>{generateTextSummary(submission.openEndedResponses.improvement)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Recognition</TableCell>
                      <TableCell>{generateTextSummary(submission.openEndedResponses.recognition)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Additional</TableCell>
                      <TableCell>{generateTextSummary(submission.openEndedResponses.additional)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai-analysis" className="space-y-6">
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-2">AI-Generated Insights</h3>
              <p className="text-sm text-gray-600 mb-4">
                The AI has analyzed the submission and extracted key insights and recommendations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Points Section */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Key Points</CardTitle>
                  <CardDescription>Important themes extracted from responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">From Highlights</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {extractKeyPoints(submission.openEndedResponses.highlight).map((point, index) => (
                          <li key={index} className="text-sm">{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">From Challenges</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {extractKeyPoints(submission.openEndedResponses.challenge).map((point, index) => (
                          <li key={index} className="text-sm">{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">From Improvements</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {extractKeyPoints(submission.openEndedResponses.improvement).map((point, index) => (
                          <li key={index} className="text-sm">{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recommendations Section */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Recommendations</CardTitle>
                  <CardDescription>AI-generated suggestions based on feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                      <h4 className="font-medium text-amber-800 mb-1">Overall Recommendation</h4>
                      <p className="text-sm text-amber-700">
                        {generateOverallRecommendation(submission.openEndedResponses)}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">For Challenges</h4>
                      <p className="text-sm p-2 bg-gray-50 rounded border">
                        {generateRecommendation(submission.openEndedResponses.challenge)}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">For Improvements</h4>
                      <p className="text-sm p-2 bg-gray-50 rounded border">
                        {generateRecommendation(submission.openEndedResponses.improvement)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Next Steps</CardTitle>
                <CardDescription>Suggested actions based on this feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm flex-shrink-0">1</div>
                    <p className="text-sm">Schedule a follow-up conversation to discuss the challenges raised.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm flex-shrink-0">2</div>
                    <p className="text-sm">Implement one targeted improvement based on the feedback.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm flex-shrink-0">3</div>
                    <p className="text-sm">Recognize team members mentioned for their positive contributions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SubmissionDetails;
