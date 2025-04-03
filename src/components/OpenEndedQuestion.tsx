
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface OpenEndedQuestionProps {
  question: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const OpenEndedQuestion = ({
  question,
  id,
  value,
  onChange,
  placeholder,
}: OpenEndedQuestionProps) => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-800">{question}</h3>
          <Textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Your thoughts..."}
            className="min-h-[100px] resize-y"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenEndedQuestion;
