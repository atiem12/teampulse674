
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Submission } from "@/types/pulseCheck";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
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
    <div className="w-full">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="h-48">
        <ChartContainer config={config}>
          <BarChart 
            data={chartData} 
            margin={{ top: 10, right: 10, left: 10, bottom: 40 }} // Increased bottom margin
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="value" 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              dy={20} // Increased space below x-axis
              interval={0} // Show all labels
              label={{ 
                value: "Rating", 
                position: "bottom", 
                dy: 30, 
                fontSize: 12 
              }}
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={40} // Added width to prevent label cutting
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
