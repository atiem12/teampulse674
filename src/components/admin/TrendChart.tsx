
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

  // Prepare data for the chart with last 4 digits of submission IDs as x-axis labels
  const chartData = sortedSubmissions.map((submission, index) => ({
    submissionNumber: index + 1,
    // Use the last 4 digits of the submission ID for x-axis labels
    shortId: submission.id.slice(-4),
    // Keep the full ID for tooltip and reference
    fullId: submission.id,
    value: parseInt(submission.likertResponses[dataKey] || "0"),
    date: submission.date, // Keep date for tooltip
  }));

  const config = {
    line: {
      color: color,
    },
  };

  return (
    <div className="w-full h-full">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="h-56">
        <ChartContainer config={config}>
          <LineChart 
            data={chartData} 
            margin={{ top: 10, right: 20, left: 20, bottom: 45 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="shortId"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              dy={20}
              interval="preserveStartEnd"
              label={{ 
                value: "Submission ID", 
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
              width={45}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Submission ${label} (${chartData.find(d => d.shortId === label)?.date})`}
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
