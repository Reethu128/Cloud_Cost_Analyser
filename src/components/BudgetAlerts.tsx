import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, DollarSign, TrendingUp, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const BudgetAlerts = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<string>("5000");
  const [budgetSet, setBudgetSet] = useState(false);
  const { toast } = useToast();

  const currentCost = 18432;
  const forecastedCost = 19531; // From forecasting logic
  const daysInMonth = 30;
  const currentDay = 22;
  const daysRemaining = daysInMonth - currentDay;

  const handleSetBudget = () => {
    setBudgetSet(true);
    toast({
      title: "Budget Set Successfully",
      description: `Monthly budget of $${parseInt(monthlyBudget).toLocaleString()} has been configured.`,
    });
  };

  const budget = parseInt(monthlyBudget);
  const isOverBudget = forecastedCost > budget;
  const percentageUsed = (currentCost / budget) * 100;
  const daysUntilOverBudget = isOverBudget
    ? Math.max(0, Math.floor((budget - currentCost) / ((forecastedCost - currentCost) / daysRemaining)))
    : null;

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-destructive" />
          Budget Alerts & Monitoring
        </CardTitle>
        <CardDescription>
          Set your monthly budget and get alerts when costs exceed thresholds
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Input */}
        <div className="space-y-3">
          <Label htmlFor="budget" className="text-sm font-medium">
            Set Monthly Budget
          </Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="budget"
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="pl-9"
                placeholder="5000"
              />
            </div>
            <Button onClick={handleSetBudget} className="bg-primary hover:opacity-90">
              Set Budget
            </Button>
          </div>
        </div>

        {budgetSet && (
          <>
            {/* Budget Progress */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Budget Usage</span>
                <span className="font-semibold text-foreground">
                  {percentageUsed.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    percentageUsed > 90
                      ? "bg-destructive"
                      : percentageUsed > 70
                      ? "bg-warning"
                      : "bg-accent"
                  }`}
                  style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${currentCost.toLocaleString()} spent</span>
                <span>${budget.toLocaleString()} budget</span>
              </div>
            </div>

            {/* Alert Card */}
            {isOverBudget && daysUntilOverBudget !== null && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-destructive">
                      Budget Alert: Projected Overspend
                    </h4>
                    <p className="text-sm text-foreground/80">
                      You will exceed your ${budget.toLocaleString()} budget in{" "}
                      <span className="font-bold text-destructive">
                        {daysUntilOverBudget} days
                      </span>
                      . Forecasted cost is ${forecastedCost.toLocaleString()}.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      <span>
                        Projected overspend: $
                        {(forecastedCost - budget).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isOverBudget && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center mt-0.5">
                    <span className="text-xs text-accent-foreground">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">On Track</h4>
                    <p className="text-sm text-foreground/80 mt-1">
                      Your projected cost of ${forecastedCost.toLocaleString()} is within
                      your ${budget.toLocaleString()} budget.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
