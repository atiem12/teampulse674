
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
      <div className="h-32">
        <ChartContainer config={config}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value}
              dy={10} // Add space below the axis
            />
            <YAxis
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
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
