
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LikertScaleProps {
  question: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const LikertScale: React.FC<LikertScaleProps> = ({ question, id, value, onChange }) => {
  const options = [
    { label: "Strongly Disagree", value: "1" },
    { label: "Disagree", value: "2" },
    { label: "Neutral", value: "3" },
    { label: "Agree", value: "4" },
    { label: "Strongly Agree", value: "5" },
  ];

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">{question}</h3>
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="flex flex-col sm:flex-row justify-between gap-2 pt-2"
          >
            {options.map((option) => (
              <div key={option.value} className="flex flex-col items-center gap-1 flex-1">
                <RadioGroupItem
                  value={option.value}
                  id={`${id}-${option.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`${id}-${option.value}`}
                  className="w-full py-2 text-center text-xs sm:text-sm rounded-md border border-gray-200 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:border-blue-500 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default LikertScale;
