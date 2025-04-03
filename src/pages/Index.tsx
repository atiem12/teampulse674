
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-700">Team Pulse</CardTitle>
          <CardDescription className="text-lg mt-2">
            Monthly team check-in for engagement and well-being
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              We value your honest feedback to create a better workplace together. 
              This quick check-in helps us understand how you're feeling and what we can improve.
            </p>
            <div className="flex flex-col space-y-2">
              <p className="font-medium text-gray-600">This check-in:</p>
              <ul className="text-left space-y-2 mx-auto max-w-md">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Takes less than 5 minutes to complete</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Is completely anonymous</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Helps improve our workplace culture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Gives you a voice in company decisions</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <Link to="/pulse-check">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md text-lg">
                Start Monthly Check-in
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
