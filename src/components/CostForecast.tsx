import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const CostForecast = () => {
  // Simple forecasting based on trend
  const historicalData = [
    { month: "Oct", cost: 16234 },
    { month: "Nov", cost: 17123 },
    { month: "Dec", cost: 18432 },
  ];

  // Linear projection
  const avgIncrease = (18432 - 16234) / 2;
  const forecastedCost = Math.round(18432 + avgIncrease);
  const percentIncrease = ((forecastedCost - 18432) / 18432 * 100).toFixed(1);

  const forecastData = [
    ...historicalData,
    { month: "Jan (Forecast)", cost: forecastedCost, forecasted: true },
  ];

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          Cost Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-accent">
              ${forecastedCost.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">predicted for next month</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-warning">↑ {percentIncrease}% increase expected</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: any) => [`$${value.toLocaleString()}`, "Cost"]}
            />
            <Line 
              type="monotone" 
              dataKey="cost" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={payload.forecasted ? "hsl(var(--warning))" : "hsl(var(--accent))"}
                    strokeWidth={2}
                    stroke="hsl(var(--background))"
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>

        <p className="text-xs text-muted-foreground mt-4">
          Forecast based on linear trend analysis of last 3 months
        </p>
      </CardContent>
    </Card>
  );
};
