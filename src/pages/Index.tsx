import { useState } from "react";
import { Cloud, TrendingDown } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ServiceBreakdown } from "@/components/dashboard/ServiceBreakdown";
import { CostTrendChart } from "@/components/dashboard/CostTrendChart";
import { ResourcesTable } from "@/components/dashboard/ResourcesTable";
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel";
import { DataUpload } from "@/components/DataUpload";
import { SplashScreen } from "@/components/SplashScreen";
import { AIRecommendations } from "@/components/AIRecommendations";
import { CostForecast } from "@/components/CostForecast";
import { AnomalyDetection } from "@/components/AnomalyDetection";
import { CloudProviderSelector } from "@/components/CloudProviderSelector";
import { ExportReport } from "@/components/ExportReport";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { BudgetAlerts } from "@/components/BudgetAlerts";
import { TagFilters } from "@/components/TagFilters";
import { CostReductionStrategies } from "@/components/CostReductionStrategies";
import { SchedulingSimulator } from "@/components/SchedulingSimulator";
import { CloudComparison } from "@/components/CloudComparison";
import { TrendInsights } from "@/components/TrendInsights";
import { WeeklyEmailGenerator } from "@/components/WeeklyEmailGenerator";
import { costMetrics, topResources, serviceCosts } from "@/lib/mockData";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [cloudProvider, setCloudProvider] = useState<"aws" | "azure" | "gcp">("aws");

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/20">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Cloud Cost Analyzer</h1>
                <p className="text-xs text-muted-foreground">Real-time cost optimization insights</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ExportReport />
              <SavingsCalculator />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingDown className="h-5 w-5 text-accent" />
                Last updated: Just now
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Cloud Provider Selector */}
        <div className="mb-6">
          <CloudProviderSelector selected={cloudProvider} onSelect={setCloudProvider} />
        </div>

        {/* Data Upload Section */}
        <div className="mb-8">
          <DataUpload onDataUploaded={setUploadedData} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {costMetrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Budget & Tag Filters Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BudgetAlerts />
          <TagFilters />
        </div>

        {/* AI & Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AIRecommendations
            costData={{
              totalCost: "$18,432",
              trend: "up",
              services: serviceCosts,
            }}
            resources={topResources}
          />
          <div className="space-y-6">
            <CostForecast />
            <AnomalyDetection />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ServiceBreakdown />
          <CostTrendChart />
        </div>

        {/* Cost Reduction & Scheduling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CostReductionStrategies />
          <SchedulingSimulator />
        </div>

        {/* Multi-Cloud Comparison & Trend Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CloudComparison />
          <TrendInsights />
        </div>

        {/* Weekly Email Generator */}
        <div className="mb-8">
          <WeeklyEmailGenerator />
        </div>

        {/* Resources Table */}
        <div className="mb-8">
          <ResourcesTable />
        </div>

        {/* Optimization Panel */}
        <OptimizationPanel />
      </main>
    </div>
  );
};

export default Index;
