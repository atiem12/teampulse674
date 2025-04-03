
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { saveApiKey } from "@/services/aiService";

interface ApiKeyInputProps {
  onSave: () => void;
}

const ApiKeyInput = ({ onSave }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  
  const handleSave = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      onSave();
      setApiKey("");
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">AI API Key Required</CardTitle>
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
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-0">
        Your API key is stored locally and never sent to our servers.
      </CardFooter>
    </Card>
  );
};

export default ApiKeyInput;
