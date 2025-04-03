
import { useState } from "react";
import { likertQuestions, openEndedQuestions } from "@/data/pulseCheckQuestions";

export interface PulseCheckFormState {
  currentSection: number;
  likertResponses: Record<string, string>;
  openEndedResponses: Record<string, string>;
}

export const usePulseCheckForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  // Likert scale responses (1-5)
  const [likertResponses, setLikertResponses] = useState<Record<string, string>>({
    workload: "",
    support: "",
    communication: "",
    growth: "",
    purpose: "",
  });

  // Open-ended question responses
  const [openEndedResponses, setOpenEndedResponses] = useState<Record<string, string>>({
    highlight: "",
    challenge: "",
    improvement: "",
    recognition: "",
    additional: "",
  });

  const totalSteps = likertQuestions.length + openEndedQuestions.length;
  const currentStep = currentSection + 1;

  const handleLikertChange = (id: string, value: string) => {
    setLikertResponses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOpenEndedChange = (id: string, value: string) => {
    setOpenEndedResponses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNext = () => {
    if (currentSection < totalSteps - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const isCurrentQuestionAnswered = () => {
    if (currentSection < likertQuestions.length) {
      const questionId = likertQuestions[currentSection].id;
      return !!likertResponses[questionId];
    }
    return true; // Don't require answers for open-ended questions
  };

  return {
    currentSection,
    likertResponses,
    openEndedResponses,
    totalSteps,
    currentStep,
    handleLikertChange,
    handleOpenEndedChange,
    handleNext,
    handlePrevious,
    isCurrentQuestionAnswered,
  };
};
