
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import WelcomeSection from "@/components/WelcomeSection";
import ProgressBar from "@/components/ProgressBar";
import QuestionRenderer from "@/components/QuestionRenderer";
import QuestionNavigation from "@/components/QuestionNavigation";
import { usePulseCheckForm } from "@/hooks/usePulseCheckForm";
import { getCurrentDate } from "@/utils/dateUtils";
import { savePulseCheckSubmission } from "@/services/pulseCheckService";
import { likertQuestions, openEndedQuestions } from "@/data/pulseCheckQuestions";

const PulseCheck = () => {
  const navigate = useNavigate();
  
  const {
    currentSection,
    likertResponses,
    openEndedResponses,
    currentStep,
    totalSteps,
    handleLikertChange,
    handleOpenEndedChange,
    handleNext,
    handlePrevious,
    isCurrentQuestionAnswered,
  } = usePulseCheckForm();

  const handleSubmit = () => {
    // Save the submission
    const submission = savePulseCheckSubmission(
      likertResponses, 
      openEndedResponses,
      getCurrentDate
    );
    
    console.log("Likert responses:", likertResponses);
    console.log("Open-ended responses:", openEndedResponses);
    
    toast.success("Your feedback has been submitted successfully!");
    navigate("/success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <WelcomeSection />
        
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <QuestionRenderer
            currentSection={currentSection}
            likertResponses={likertResponses}
            openEndedResponses={openEndedResponses}
            onLikertChange={handleLikertChange}
            onOpenEndedChange={handleOpenEndedChange}
          />
          
          <QuestionNavigation
            currentSection={currentSection}
            isCurrentQuestionAnswered={isCurrentQuestionAnswered()}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default PulseCheck;
