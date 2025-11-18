import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { CostMetric } from "@/lib/mockData";

interface MetricCardProps {
  metric: CostMetric;
}

export const MetricCard = ({ metric }: MetricCardProps) => {
  const isPositive = metric.trend === "down" && metric.label.includes("Savings");
  const isNegative = metric.trend === "up" && !metric.label.includes("Resources");

  return (
    <Card className="border-border/50 hover:border-primary/50 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-bold text-foreground">{metric.value}</p>
          {metric.change !== 0 && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                isPositive
                  ? "text-accent"
                  : isNegative
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {metric.trend === "up" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              {Math.abs(metric.change)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
