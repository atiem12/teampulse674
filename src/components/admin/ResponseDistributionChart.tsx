
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Submission } from "@/types/pulseCheck";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { getLikertText } from "@/utils/submissionUtils";

interface ResponseDistributionChartProps {
  submissions: Submission[];
  dataKey: keyof Submission["likertResponses"];
  title: string;
  color?: string;
}

const ResponseDistributionChart = ({ 
  submissions, 
  dataKey, 
  title, 
  color = "#3b82f6" 
}: ResponseDistributionChartProps) => {
  // Count frequency of each response value
  const responseCount = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
  };
  
  submissions.forEach(submission => {
    const value = submission.likertResponses[dataKey];
    if (value && responseCount[value as keyof typeof responseCount] !== undefined) {
      responseCount[value as keyof typeof responseCount]++;
    }
  });
  
  // Prepare data for the chart
  const chartData = Object.entries(responseCount).map(([value, count]) => ({
    value,
    count,
    label: getLikertText(value)
  }));

  const config = {
    bar: {
      color: color,
    },
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <div className="flex-grow">
        <ChartContainer config={config}>
          <BarChart 
            data={chartData} 
            margin={{ top: 5, right: 20, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="value" 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              dy={12}
              interval={0}
              label={{ 
                value: "Rating", 
                position: "bottom", 
                dy: 15,
                fontSize: 11 
              }}
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => getLikertText(label)}
                  formatter={(value) => [`${value} responses`, 'Count']}
                />
              }
            />
            <Bar 
              dataKey="count" 
              fill={color} 
              name="Responses"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ResponseDistributionChart;
