
import LikertScale from "@/components/LikertScale";
import OpenEndedQuestion from "@/components/OpenEndedQuestion";
import { likertQuestions, openEndedQuestions } from "@/data/pulseCheckQuestions";

interface QuestionRendererProps {
  currentSection: number;
  likertResponses: Record<string, string>;
  openEndedResponses: Record<string, string>;
  onLikertChange: (id: string, value: string) => void;
  onOpenEndedChange: (id: string, value: string) => void;
}

const QuestionRenderer = ({
  currentSection,
  likertResponses,
  openEndedResponses,
  onLikertChange,
  onOpenEndedChange,
}: QuestionRendererProps) => {
  if (currentSection < likertQuestions.length) {
    const question = likertQuestions[currentSection];
    return (
      <LikertScale
        question={question.question}
        id={question.id}
        value={likertResponses[question.id]}
        onChange={(value) => onLikertChange(question.id, value)}
      />
    );
  } else {
    const questionIndex = currentSection - likertQuestions.length;
    const question = openEndedQuestions[questionIndex];
    return (
      <OpenEndedQuestion
        question={question.question}
        id={question.id}
        value={openEndedResponses[question.id]}
        onChange={(value) => onOpenEndedChange(question.id, value)}
        placeholder={question.placeholder}
      />
    );
  }
};

export default QuestionRenderer;
