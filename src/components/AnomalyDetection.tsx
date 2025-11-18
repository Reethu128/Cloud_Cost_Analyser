import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Activity } from "lucide-react";

export const AnomalyDetection = () => {
  const currentCost = 18432;
  const last7DayAvg = 16890;
  const difference = ((currentCost - last7DayAvg) / last7DayAvg * 100).toFixed(1);
  const isAnomaly = Math.abs(Number(difference)) > 10;

  const anomalies = [
    {
      id: 1,
      service: "EC2 Compute",
      message: "Unusual spike in instance usage detected",
      increase: "+35%",
      severity: "high" as const,
    },
    {
      id: 2,
      service: "Data Transfer",
      message: "Outbound traffic increased significantly",
      increase: "+22%",
      severity: "medium" as const,
    },
  ];

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-destructive" />
          Cost Anomaly Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current vs 7-day average</p>
              <p className="text-2xl font-bold text-destructive">
                {difference > "0" ? "+" : ""}{difference}%
              </p>
            </div>
            {isAnomaly && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Anomaly
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Current cost: ${currentCost.toLocaleString()} | Average: ${last7DayAvg.toLocaleString()}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Detected Anomalies</h4>
          {anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="p-3 rounded-lg border border-border/50 bg-secondary/30 hover:border-destructive/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-foreground">{anomaly.service}</p>
                <Badge
                  variant={anomaly.severity === "high" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {anomaly.severity}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{anomaly.message}</p>
              <div className="flex items-center gap-1 text-xs text-destructive">
                <TrendingUp className="h-3 w-3" />
                <span className="font-semibold">{anomaly.increase}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
