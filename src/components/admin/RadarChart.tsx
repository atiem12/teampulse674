
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Submission } from "@/types/pulseCheck";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart } from "recharts";

interface RadarChartProps {
  submission: Submission;
}

const RadarChart = ({ submission }: RadarChartProps) => {
  const likertData = [
    {
      subject: "Workload",
      value: parseInt(submission.likertResponses.workload || "0"),
      fullMark: 5,
    },
    {
      subject: "Support",
      value: parseInt(submission.likertResponses.support || "0"),
      fullMark: 5,
    },
    {
      subject: "Communication",
      value: parseInt(submission.likertResponses.communication || "0"),
      fullMark: 5,
    },
    {
      subject: "Growth",
      value: parseInt(submission.likertResponses.growth || "0"),
      fullMark: 5,
    },
    {
      subject: "Purpose",
      value: parseInt(submission.likertResponses.purpose || "0"),
      fullMark: 5,
    },
  ];

  const config = {
    radar: {
      color: "#3b82f6",
    },
  };

  return (
    <div className="w-full h-full">
      <ChartContainer config={config} className="w-full h-full">
        <RechartsRadarChart 
          data={likertData} 
          outerRadius="85%" 
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          width={undefined}
          height={undefined}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 5]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Radar
            name="Likert Score"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RechartsRadarChart>
      </ChartContainer>
    </div>
  );
};

export default RadarChart;
