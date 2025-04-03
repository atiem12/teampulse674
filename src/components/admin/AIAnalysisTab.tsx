
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Submission } from "@/types/pulseCheck";
import { extractKeyPoints, generateOverallRecommendation } from "@/utils/textUtils";

interface AIAnalysisTabProps {
  submission: Submission;
}

const AIAnalysisTab = ({ submission }: AIAnalysisTabProps) => {
  const openEndedResponsesRecord: Record<string, string> = {
    ...submission.openEndedResponses
  };
  
  const allResponsesText = Object.values(openEndedResponsesRecord).join(' ');
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-2">AI-Generated Insights</h3>
        <p className="text-sm text-gray-600 mb-4">
          The AI has analyzed the submission to provide overall insights and recommendations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Points Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Key Points</CardTitle>
            <CardDescription>Important themes extracted from all responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-1">From All Responses</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {extractKeyPoints(allResponsesText).map((point, index) => (
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
            <CardDescription>AI-generated suggestions based on overall feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                <h4 className="font-medium text-amber-800 mb-1">Overall Recommendation</h4>
                <p className="text-sm text-amber-700">
                  {generateOverallRecommendation(openEndedResponsesRecord)}
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
              <p className="text-sm">Schedule a follow-up conversation to discuss the key themes in this feedback.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm flex-shrink-0">2</div>
              <p className="text-sm">Implement one targeted improvement based on the overall recommendation.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm flex-shrink-0">3</div>
              <p className="text-sm">Share the summarized insights with the team to promote transparency.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAnalysisTab;
