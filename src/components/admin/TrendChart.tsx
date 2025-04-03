
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

  // Prepare data for the chart
  const chartData = sortedSubmissions.map((submission) => ({
    date: submission.date,
    value: parseInt(submission.likertResponses[dataKey] || "0"),
    id: submission.id,
  }));

  const config = {
    line: {
      color: color,
    },
  };

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="h-40">
        <ChartContainer config={config}>
          <LineChart 
            data={chartData} 
            margin={{ top: 10, right: 10, left: 10, bottom: 40 }} // Increased bottom margin
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value}
              dy={20} // Increased space below x-axis
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={40} // Added width to prevent label cutting
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Date: ${label}`}
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
