
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SubmissionSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">Thank You!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-gray-700">
            Your feedback has been submitted successfully.
          </p>
          <p className="text-gray-600 text-sm">
            Your input helps us create a better workplace for everyone.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Return Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubmissionSuccess;
