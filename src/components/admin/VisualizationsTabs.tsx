
import { Submission } from "@/types/pulseCheck";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendChart from "./TrendChart";
import ResponseDistributionChart from "./ResponseDistributionChart";

interface VisualizationsTabsProps {
  submissions: Submission[];
}

const VisualizationsTabs = ({ submissions }: VisualizationsTabsProps) => {
  if (submissions.length === 0) return null;

  return (
    <Tabs defaultValue="trends">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="trends" className="flex-1">Trends</TabsTrigger>
        <TabsTrigger value="distribution" className="flex-1">Distribution</TabsTrigger>
      </TabsList>
      
      <TabsContent value="trends" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80">
            <TrendChart 
              submissions={submissions} 
              dataKey="workload" 
              title="Workload Satisfaction" 
              color="#3b82f6"
            />
          </div>
          <div className="h-80">
            <TrendChart 
              submissions={submissions} 
              dataKey="support" 
              title="Team Support" 
              color="#10b981"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80">
            <TrendChart 
              submissions={submissions} 
              dataKey="communication" 
              title="Communication" 
              color="#f59e0b"
            />
          </div>
          <div className="h-80">
            <TrendChart 
              submissions={submissions} 
              dataKey="growth" 
              title="Growth Opportunities" 
              color="#8b5cf6"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80">
            <TrendChart 
              submissions={submissions} 
              dataKey="purpose" 
              title="Purpose Clarity" 
              color="#ec4899"
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="distribution" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponseDistributionChart 
              submissions={submissions} 
              dataKey="workload" 
              title="Workload Satisfaction" 
              color="#3b82f6"
            />
          </div>
          <div className="h-80">
            <ResponseDistributionChart 
              submissions={submissions} 
              dataKey="support" 
              title="Team Support" 
              color="#10b981"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponseDistributionChart 
              submissions={submissions} 
              dataKey="communication" 
              title="Communication" 
              color="#f59e0b"
            />
          </div>
          <div className="h-80">
            <ResponseDistributionChart 
              submissions={submissions} 
              dataKey="growth" 
              title="Growth Opportunities" 
              color="#8b5cf6"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponseDistributionChart 
              submissions={submissions} 
              dataKey="purpose" 
              title="Purpose Clarity" 
              color="#ec4899"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default VisualizationsTabs;
