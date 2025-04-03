
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Submission } from "@/types/pulseCheck";
import { generateInsights, getApiKey } from "@/services/aiService";
import ApiKeyInput from "./ApiKeyInput";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";

interface AiInsightsProps {
  submissions: Submission[];
}

const AiInsights = ({ submissions }: AiInsightsProps) => {
  const [insights, setInsights] = useState<{ keyPoints: string[], recommendation: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(!!getApiKey());
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
    } catch (err: any) {
      console.error("Error fetching insights:", err);
      // Check for specific OpenAI error messages
      if (err.message?.includes("429") || err.message?.includes("quota")) {
        setError("API quota exceeded. Please check your OpenAI account billing or try a different API key.");
      } else if (err.message?.includes("401") || err.message?.includes("authentication")) {
        setError("Invalid API key. Please provide a valid OpenAI API key.");
      } else {
        setError("Failed to generate insights. Please try again later.");
      }
      setHasApiKey(false);
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

  const handleRetry = () => {
    if (hasApiKey) {
      fetchInsights();
    }
  };

  const resetApiKey = () => {
    setHasApiKey(false);
    setError(null);
  };

  if (!hasApiKey) {
    return <ApiKeyInput onSave={handleApiKeySaved} error={error} />;
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">AI-Generated Insights</CardTitle>
          <CardDescription>
            Analysis powered by OpenAI
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRetry} 
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetApiKey}
          >
            Change API Key
          </Button>
        </div>
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
          <div className="flex items-center text-red-500 gap-2 p-4 border border-red-200 rounded-md bg-red-50">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p>{error}</p>
              <p className="text-sm mt-1">Try entering a new API key or check your OpenAI account.</p>
            </div>
          </div>
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
