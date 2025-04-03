
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { savePulseCheckSubmission } from "@/services/pulseCheckService";
import { getCurrentFormattedDate } from "@/utils/dateUtils";
import { Submission, LikertResponses, OpenEndedResponses } from "@/types/pulseCheck";
import { likertQuestions, openEndedQuestions } from "@/data/pulseCheckQuestions";
import WelcomeSection from "@/components/WelcomeSection";
import ProgressBar from "@/components/ProgressBar";
import QuestionRenderer from "@/components/QuestionRenderer";
import QuestionNavigation from "@/components/QuestionNavigation";

const PulseCheck = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [likertResponses, setLikertResponses] = useState<LikertResponses>({
    workload: "",
    support: "",
    communication: "",
    growth: "",
    purpose: ""
  });
  const [openEndedResponses, setOpenEndedResponses] = useState<OpenEndedResponses>({
    highlight: "",
    challenge: "",
    improvement: "",
    recognition: "",
    additional: ""
  });

  const totalSections = likertQuestions.length + openEndedQuestions.length;

  const handleLikertChange = (id: string, value: string) => {
    setLikertResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleOpenEndedChange = (id: string, value: string) => {
    setOpenEndedResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = () => {
    // Save submission to local storage
    const submission: Submission = savePulseCheckSubmission(
      likertResponses,
      openEndedResponses,
      getCurrentFormattedDate
    );

    console.log("Submission saved:", submission);
    
    // Redirect to success page
    navigate("/success");
  };

  const getCurrentQuestion = () => {
    if (currentSection < likertQuestions.length) {
      return likertQuestions[currentSection];
    } else {
      return openEndedQuestions[currentSection - likertQuestions.length];
    }
  };

  const currentQuestion = getCurrentQuestion();
  const isLikertSection = currentSection < likertQuestions.length;
  const isLastSection = currentSection === totalSections - 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <WelcomeSection />
        
        <ProgressBar 
          currentStep={currentSection + 1} 
          totalSteps={totalSections} 
        />
        
        <div className="my-6">
          <QuestionRenderer
            currentSection={currentSection}
            likertResponses={likertResponses as Record<string, string>}
            openEndedResponses={openEndedResponses as Record<string, string>}
            onLikertChange={handleLikertChange}
            onOpenEndedChange={handleOpenEndedChange}
          />
        </div>

        <QuestionNavigation 
          currentSection={currentSection}
          isCurrentQuestionAnswered={
            isLikertSection 
              ? !!likertResponses[currentQuestion.id] 
              : true
          }
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default PulseCheck;
