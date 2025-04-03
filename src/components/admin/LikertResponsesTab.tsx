
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Submission } from "@/types/pulseCheck";
import { getLikertText } from "@/utils/submissionUtils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface LikertResponsesTabProps {
  submission: Submission;
}

const LikertResponsesTab = ({ submission }: LikertResponsesTabProps) => {
  // Data for the bar chart visualization
  const chartData = [
    { name: "Workload", value: parseInt(submission.likertResponses.workload || "0"), label: "Workload Satisfaction", color: "#3b82f6" },
    { name: "Support", value: parseInt(submission.likertResponses.support || "0"), label: "Team Support", color: "#10b981" },
    { name: "Communication", value: parseInt(submission.likertResponses.communication || "0"), label: "Communication", color: "#f59e0b" },
    { name: "Growth", value: parseInt(submission.likertResponses.growth || "0"), label: "Growth Opportunities", color: "#ec4899" },
    { name: "Purpose", value: parseInt(submission.likertResponses.purpose || "0"), label: "Purpose Clarity", color: "#8b5cf6" }
  ];

  const config = {
    bar: {
      color: "#3b82f6",
    },
  };

  return (
    <div className="space-y-6">
      <div className="h-64">
        <ChartContainer config={config}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => {
                    const item = chartData.find(d => d.name === label);
                    return item ? item.label : label;
                  }}
                  formatter={(value) => [`${value}`, 'Score']}
                />
              }
            />
            <Bar 
              dataKey="value" 
              name="Score"
              radius={[4, 4, 0, 0]}
              fill="#3b82f6"
            />
          </BarChart>
        </ChartContainer>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Response</TableHead>
            <TableHead>Score (1-5)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>I feel my current workload is manageable and sustainable.</TableCell>
            <TableCell>{getLikertText(submission.likertResponses.workload)}</TableCell>
            <TableCell>{submission.likertResponses.workload || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>I feel supported by my team and manager.</TableCell>
            <TableCell>{getLikertText(submission.likertResponses.support)}</TableCell>
            <TableCell>{submission.likertResponses.support || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Communication within my team has been clear and effective this month.</TableCell>
            <TableCell>{getLikertText(submission.likertResponses.communication)}</TableCell>
            <TableCell>{submission.likertResponses.communication || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>I see opportunities to learn and grow in my role.</TableCell>
            <TableCell>{getLikertText(submission.likertResponses.growth)}</TableCell>
            <TableCell>{submission.likertResponses.growth || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>I understand how my work contributes to our team's goals.</TableCell>
            <TableCell>{getLikertText(submission.likertResponses.purpose)}</TableCell>
            <TableCell>{submission.likertResponses.purpose || "N/A"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default LikertResponsesTab;
