
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { saveApiKey } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyInputProps {
  onSave: () => void;
  error?: string | null;
}

const ApiKeyInput = ({ onSave, error }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();
  
  const handleSave = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved successfully."
      });
      onSave();
      setApiKey("");
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Team Pulse AI API Key Required</CardTitle>
        <CardDescription>
          Enter your OpenAI API key to enable AI-powered insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSave}>Save Key</Button>
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-500">
            {error}
            <p className="mt-1">
              Make sure your OpenAI API key has sufficient quota and is valid.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-0">
        <div>
          <p>Your API key is stored locally and never sent to our servers.</p>
          <p className="mt-1">Need a key? Create one at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com/api-keys</a></p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApiKeyInput;
