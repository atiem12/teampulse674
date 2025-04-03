
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WelcomeSection = () => {
  return (
    <Card className="mb-6 border-l-4 border-l-blue-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-700">Monthly Team Pulse</CardTitle>
        <CardDescription>
          Share how your month has been going. Your anonymous feedback helps us build a better workplace together.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          This should take less than 5 minutes to complete. Please be honest - there are no right or wrong answers.
        </p>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
