import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SavingsOption {
  id: string;
  title: string;
  description: string;
  savings: number;
}

export const SavingsCalculator = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const savingsOptions: SavingsOption[] = [
    {
      id: "idle-instances",
      title: "Stop 3 Idle EC2 Instances",
      description: "Instances with <5% utilization for 7+ days",
      savings: 1245,
    },
    {
      id: "downsize",
      title: "Downsize 5 Underutilized Instances",
      description: "Running at <20% capacity",
      savings: 892,
    },
    {
      id: "reserved",
      title: "Switch to Reserved Instances",
      description: "1-year commitment for stable workloads",
      savings: 678,
    },
    {
      id: "snapshots",
      title: "Delete Old Snapshots (127 items)",
      description: "Snapshots older than 90 days",
      savings: 234,
    },
    {
      id: "s3-lifecycle",
      title: "Enable S3 Lifecycle Policies",
      description: "Move infrequent data to cheaper tiers",
      savings: 196,
    },
    {
      id: "unused-ips",
      title: "Release Unused Elastic IPs",
      description: "8 unattached IPs detected",
      savings: 58,
    },
  ];

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((opt) => opt !== id) : [...prev, id]
    );
  };

  const totalSavings = savingsOptions
    .filter((opt) => selectedOptions.includes(opt.id))
    .reduce((sum, opt) => sum + opt.savings, 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-accent/50 hover:border-accent">
          <Calculator className="mr-2 h-4 w-4" />
          Savings Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-accent" />
            What-If Savings Calculator
          </DialogTitle>
          <DialogDescription>
            Select optimization actions to calculate potential monthly savings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {savingsOptions.map((option) => (
            <div
              key={option.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedOptions.includes(option.id)
                  ? "border-accent bg-accent/10"
                  : "border-border/50 bg-secondary/30 hover:border-accent/50"
              }`}
              onClick={() => toggleOption(option.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={() => toggleOption(option.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{option.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold text-accent">
                      ${option.savings.toLocaleString()}/month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/50">
          <CardHeader>
            <CardTitle className="text-2xl">Total Potential Savings</CardTitle>
            <CardDescription>
              Based on {selectedOptions.length} selected optimization{selectedOptions.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-accent">
                ${totalSavings.toLocaleString()}
              </span>
              <span className="text-lg text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Annual savings: <span className="font-semibold text-accent">${(totalSavings * 12).toLocaleString()}</span>
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
