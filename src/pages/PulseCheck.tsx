
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WelcomeSection from "@/components/WelcomeSection";
import LikertScale from "@/components/LikertScale";
import OpenEndedQuestion from "@/components/OpenEndedQuestion";
import ProgressBar from "@/components/ProgressBar";
import { toast } from "sonner";

// Simple utility to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const PulseCheck = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  
  // Likert scale responses (1-5)
  const [likertResponses, setLikertResponses] = useState({
    workload: "",
    support: "",
    communication: "",
    growth: "",
    purpose: "",
  });

  // Open-ended question responses
  const [openEndedResponses, setOpenEndedResponses] = useState({
    highlight: "",
    challenge: "",
    improvement: "",
    recognition: "",
    additional: "",
  });

  const likertQuestions = [
    {
      id: "workload",
      question: "I feel my current workload is manageable and sustainable.",
    },
    {
      id: "support",
      question: "I feel supported by my team and manager.",
    },
    {
      id: "communication",
      question: "Communication within my team has been clear and effective this week.",
    },
    {
      id: "growth",
      question: "I see opportunities to learn and grow in my role.",
    },
    {
      id: "purpose",
      question: "I understand how my work contributes to our team's goals.",
    },
  ];

  const openEndedQuestions = [
    {
      id: "highlight",
      question: "What was a highlight of your week?",
      placeholder: "Something that went well or made you feel good...",
    },
    {
      id: "challenge",
      question: "What was challenging for you this week?",
      placeholder: "A difficult situation or something you struggled with...",
    },
    {
      id: "improvement",
      question: "Is there something we could improve about how we work together?",
      placeholder: "A suggestion or idea that might help the team...",
    },
    {
      id: "recognition",
      question: "Is there someone who helped you this week that deserves recognition?",
      placeholder: "A colleague who went above and beyond...",
    },
    {
      id: "additional",
      question: "Is there anything else you'd like to share about your experience this week?",
      placeholder: "Any other thoughts, feelings, or suggestions...",
    },
  ];

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

  const handleSubmit = () => {
    // Create a submission object with all responses and metadata
    const submission = {
      id: Date.now().toString(), // Simple unique ID based on timestamp
      date: getCurrentDate(),
      submittedAt: new Date().toISOString(),
      likertResponses,
      openEndedResponses
    };

    // Get existing submissions from localStorage or initialize empty array
    const existingSubmissions = JSON.parse(localStorage.getItem('pulseCheckSubmissions') || '[]');
    
    // Add new submission to the array
    const updatedSubmissions = [...existingSubmissions, submission];
    
    // Save updated array back to localStorage
    localStorage.setItem('pulseCheckSubmissions', JSON.stringify(updatedSubmissions));
    
    console.log("Likert responses:", likertResponses);
    console.log("Open-ended responses:", openEndedResponses);
    
    toast.success("Your feedback has been submitted successfully!");
    navigate("/success");
  };

  const renderCurrentQuestion = () => {
    if (currentSection < likertQuestions.length) {
      const question = likertQuestions[currentSection];
      return (
        <LikertScale
          question={question.question}
          id={question.id}
          value={likertResponses[question.id as keyof typeof likertResponses]}
          onChange={(value) => handleLikertChange(question.id, value)}
        />
      );
    } else {
      const questionIndex = currentSection - likertQuestions.length;
      const question = openEndedQuestions[questionIndex];
      return (
        <OpenEndedQuestion
          question={question.question}
          id={question.id}
          value={openEndedResponses[question.id as keyof typeof openEndedResponses]}
          onChange={(value) => handleOpenEndedChange(question.id, value)}
          placeholder={question.placeholder}
        />
      );
    }
  };

  const isCurrentQuestionAnswered = () => {
    if (currentSection < likertQuestions.length) {
      const questionId = likertQuestions[currentSection].id;
      return !!likertResponses[questionId as keyof typeof likertResponses];
    }
    return true; // Don't require answers for open-ended questions
  };

  const isLastQuestion = currentSection === totalSteps - 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <WelcomeSection />
        
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderCurrentQuestion()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSection === 0}
            >
              Previous
            </Button>
            
            {isLastQuestion ? (
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Feedback
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next Question
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PulseCheck;
