import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock, DollarSign, Moon, Sun } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export const SchedulingSimulator = () => {
  const [shutdownStart, setShutdownStart] = useState([20]); // 8 PM
  const [shutdownEnd, setShutdownEnd] = useState([8]); // 8 AM
  const [selectedEnv, setSelectedEnv] = useState<"dev" | "test" | "staging">("dev");

  // Cost calculations
  const hourlyRate = 1.5; // $1.50 per hour
  const totalHours = 24;
  const shutdownHours = shutdownEnd[0] > shutdownStart[0]
    ? shutdownEnd[0] - shutdownStart[0]
    : (24 - shutdownStart[0]) + shutdownEnd[0];
  
  const runningHours = totalHours - shutdownHours;
  const dailyCostWithScheduling = runningHours * hourlyRate;
  const dailyCostWithoutScheduling = totalHours * hourlyRate;
  const dailySavings = dailyCostWithoutScheduling - dailyCostWithScheduling;
  const monthlySavings = dailySavings * 30;
  const savingsPercentage = (dailySavings / dailyCostWithoutScheduling) * 100;

  const formatTime = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Hourly Scheduling Simulator
        </CardTitle>
        <CardDescription>
          Simulate cost savings by shutting down non-production instances after hours
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Environment Selector */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Environment</Label>
          <div className="flex gap-2">
            {(["dev", "test", "staging"] as const).map((env) => (
              <Button
                key={env}
                variant={selectedEnv === env ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedEnv(env)}
                className={selectedEnv === env ? "bg-primary" : ""}
              >
                {env.charAt(0).toUpperCase() + env.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Shutdown Time Range */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Moon className="h-4 w-4 text-muted-foreground" />
                Shutdown Start
              </Label>
              <span className="text-sm font-semibold text-foreground">
                {formatTime(shutdownStart[0])}
              </span>
            </div>
            <Slider
              value={shutdownStart}
              onValueChange={setShutdownStart}
              max={23}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                Shutdown End
              </Label>
              <span className="text-sm font-semibold text-foreground">
                {formatTime(shutdownEnd[0])}
              </span>
            </div>
            <Slider
              value={shutdownEnd}
              onValueChange={setShutdownEnd}
              max={23}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Savings Summary */}
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-5 space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-accent" />
            Projected Savings
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Shutdown Hours</p>
              <p className="text-2xl font-bold text-foreground">{shutdownHours}h</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Running Hours</p>
              <p className="text-2xl font-bold text-foreground">{runningHours}h</p>
            </div>
          </div>

          <div className="pt-3 border-t border-border/30 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Daily Savings</span>
              <span className="text-lg font-bold text-accent">
                ${dailySavings.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Monthly Savings</span>
              <span className="text-xl font-bold text-accent">
                ${monthlySavings.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cost Reduction</span>
              <span className="text-lg font-bold text-accent">
                {savingsPercentage.toFixed(1)}%
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground pt-2">
            💡 Schedule automatic shutdown from {formatTime(shutdownStart[0])} to{" "}
            {formatTime(shutdownEnd[0])} to save ${monthlySavings.toFixed(2)}/month on{" "}
            {selectedEnv} environment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
