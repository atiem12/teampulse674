
import { Button } from "@/components/ui/button";
import { likertQuestions, openEndedQuestions } from "@/data/pulseCheckQuestions";

interface QuestionNavigationProps {
  currentSection: number;
  isCurrentQuestionAnswered: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const QuestionNavigation = ({
  currentSection,
  isCurrentQuestionAnswered,
  onPrevious,
  onNext,
  onSubmit,
}: QuestionNavigationProps) => {
  const totalSteps = likertQuestions.length + openEndedQuestions.length;
  const isLastQuestion = currentSection === totalSteps - 1;

  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentSection === 0}
      >
        Previous
      </Button>
      
      {isLastQuestion ? (
        <Button 
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          Submit Feedback
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!isCurrentQuestionAnswered}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Next Question
        </Button>
      )}
    </div>
  );
};

export default QuestionNavigation;
