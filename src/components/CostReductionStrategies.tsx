import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, CheckCircle2 } from "lucide-react";

interface Strategy {
  id: string;
  category: string;
  title: string;
  description: string;
  potentialSavings: string;
  difficulty: "easy" | "medium" | "hard";
  timeframe: string;
}

const strategies: Strategy[] = [
  {
    id: "s1",
    category: "Compute",
    title: "Switch to Reserved Instances",
    description:
      "Commit to 1-year or 3-year reserved instances for stable workloads. Save up to 40% compared to on-demand pricing.",
    potentialSavings: "30-40%",
    difficulty: "easy",
    timeframe: "Immediate",
  },
  {
    id: "s2",
    category: "Compute",
    title: "Use Spot Instances for Non-Critical Workloads",
    description:
      "Replace on-demand instances with spot instances for batch jobs, testing, and dev environments. Save up to 90%.",
    potentialSavings: "70-90%",
    difficulty: "medium",
    timeframe: "1-2 weeks",
  },
  {
    id: "s3",
    category: "Storage",
    title: "Move Old Data to Cold Storage",
    description:
      "Transition infrequently accessed S3 data to Glacier or Deep Archive tiers. Reduce storage costs by up to 85%.",
    potentialSavings: "75-85%",
    difficulty: "easy",
    timeframe: "Immediate",
  },
  {
    id: "s4",
    category: "Compute",
    title: "Implement Auto-Shutdown for Non-Production",
    description:
      "Automatically shut down dev/test instances after business hours (8 PM - 8 AM). Save 60% on non-production costs.",
    potentialSavings: "50-60%",
    difficulty: "easy",
    timeframe: "1 week",
  },
  {
    id: "s5",
    category: "Network",
    title: "Use CDN for Static Content",
    description:
      "Reduce data transfer costs by serving static assets through CloudFront CDN. Lower egress charges significantly.",
    potentialSavings: "40-50%",
    difficulty: "medium",
    timeframe: "2-3 weeks",
  },
  {
    id: "s6",
    category: "Database",
    title: "Right-Size Database Instances",
    description:
      "Analyze actual usage patterns and downsize over-provisioned RDS instances. Many databases run at <30% capacity.",
    potentialSavings: "30-50%",
    difficulty: "medium",
    timeframe: "2-4 weeks",
  },
  {
    id: "s7",
    category: "Storage",
    title: "Enable S3 Intelligent-Tiering",
    description:
      "Let AWS automatically move objects between access tiers based on usage patterns. Zero overhead, automatic savings.",
    potentialSavings: "20-40%",
    difficulty: "easy",
    timeframe: "Immediate",
  },
  {
    id: "s8",
    category: "Optimization",
    title: "Delete Unused Resources",
    description:
      "Remove idle instances, unattached volumes, old snapshots, and unused Elastic IPs. Eliminate waste completely.",
    potentialSavings: "100%",
    difficulty: "easy",
    timeframe: "Immediate",
  },
];

export const CostReductionStrategies = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-accent/20 text-accent border-accent/30";
      case "medium":
        return "bg-warning/20 text-warning border-warning/30";
      case "hard":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-warning" />
          Cost Reduction Strategies
        </CardTitle>
        <CardDescription>
          AI-powered optimization engine with proven cost-saving tactics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="p-4 bg-secondary/30 rounded-lg border border-border/30 hover:border-accent/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <h4 className="font-semibold text-foreground">{strategy.title}</h4>
                </div>
                <Badge variant="outline" className="text-xs">
                  {strategy.category}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30">
                  💰 Save {strategy.potentialSavings}
                </Badge>
                <Badge variant="outline" className={`text-xs ${getDifficultyColor(strategy.difficulty)}`}>
                  {strategy.difficulty.charAt(0).toUpperCase() + strategy.difficulty.slice(1)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ⏱️ {strategy.timeframe}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
