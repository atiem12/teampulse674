
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Submission } from "@/types/pulseCheck";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface TrendChartProps {
  submissions: Submission[];
  dataKey: keyof Submission["likertResponses"];
  title: string;
  color?: string;
}

const TrendChart = ({ submissions, dataKey, title, color = "#3b82f6" }: TrendChartProps) => {
  // Sort submissions by date (oldest first for trend visualization)
  const sortedSubmissions = [...submissions].sort(
    (a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  );

  // Prepare data for the chart with submission numbers instead of dates
  const chartData = sortedSubmissions.map((submission, index) => ({
    submissionNumber: `#${index + 1}`,
    value: parseInt(submission.likertResponses[dataKey] || "0"),
    id: submission.id,
    date: submission.date, // Keep date for tooltip
  }));

  const config = {
    line: {
      color: color,
    },
  };

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="h-44">
        <ChartContainer config={config}>
          <LineChart 
            data={chartData} 
            margin={{ top: 10, right: 20, left: 20, bottom: 45 }} // Increased all margins
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="submissionNumber"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              dy={20} // Space below x-axis
              interval="preserveStartEnd"
              label={{ 
                value: "Submission", 
                position: "bottom", 
                dy: 30, 
                fontSize: 12 
              }}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={45} // Increased width to prevent label cutting
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Submission ${label} (${chartData.find(d => d.submissionNumber === label)?.date})`}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3, fill: color }}
              activeDot={{ r: 5 }}
              name={title}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default TrendChart;
