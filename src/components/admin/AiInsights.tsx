
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Submission } from "@/types/pulseCheck";
import { generateInsights } from "@/services/aiService";
import ApiKeyInput from "./ApiKeyInput";
import { Skeleton } from "@/components/ui/skeleton";

interface AiInsightsProps {
  submissions: Submission[];
}

const AiInsights = ({ submissions }: AiInsightsProps) => {
  const [insights, setInsights] = useState<{ keyPoints: string[], recommendation: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(!!localStorage.getItem("openai_api_key"));
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    if (submissions.length === 0) {
      setInsights({
        keyPoints: ["No submissions to analyze"],
        recommendation: "Wait for employee feedback to generate insights"
      });
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await generateInsights(submissions);
      setInsights(result);
    } catch (err) {
      console.error("Error fetching insights:", err);
      setError("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasApiKey && submissions.length > 0) {
      fetchInsights();
    }
  }, [hasApiKey, submissions.length]);

  const handleApiKeySaved = () => {
    setHasApiKey(true);
    fetchInsights();
  };

  if (!hasApiKey) {
    return <ApiKeyInput onSave={handleApiKeySaved} />;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">AI-Generated Insights</CardTitle>
        <CardDescription>
          Analysis powered by OpenAI
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : insights ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Key Themes</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {insights.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Recommendation</h3>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-md text-sm">
                {insights.recommendation}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default AiInsights;
