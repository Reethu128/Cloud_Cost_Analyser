import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import { optimizations } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export const OptimizationPanel = () => {
  const [selectedOpt, setSelectedOpt] = useState<typeof optimizations[0] | null>(null);

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          Optimization Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {optimizations.map((opt) => (
            <div
              key={opt.id}
              className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all bg-secondary/30"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{opt.title}</h4>
                    <Badge
                      variant={
                        opt.priority === "high"
                          ? "destructive"
                          : opt.priority === "medium"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        opt.priority === "high"
                          ? "bg-destructive/20 text-destructive border-destructive/30"
                          : opt.priority === "medium"
                          ? "bg-warning/20 text-warning border-warning/30"
                          : "bg-muted/50 text-muted-foreground"
                      }
                    >
                      {opt.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{opt.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Category: {opt.category}</span>
                    <span className="font-semibold text-accent">
                      Save ${opt.potentialSavings.toLocaleString()}/mo
                    </span>
                  </div>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSelectedOpt(opt)}
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {opt.title}
                      <Badge
                        variant={
                          opt.priority === "high"
                            ? "destructive"
                            : opt.priority === "medium"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {opt.priority} priority
                      </Badge>
                    </DialogTitle>
                    <DialogDescription className="text-base pt-2">
                      {opt.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                        <p className="text-sm text-muted-foreground mb-1">Category</p>
                        <p className="text-lg font-semibold">{opt.category}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                        <p className="text-sm text-muted-foreground mb-1">Potential Savings</p>
                        <p className="text-2xl font-bold text-accent">
                          ${opt.potentialSavings.toLocaleString()}/mo
                        </p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                      <h4 className="font-semibold mb-2">Recommended Actions</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Review the identified resources in your cloud console
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Verify the optimization recommendation applies to your use case
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Implement changes during a maintenance window
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Monitor the impact on costs and performance
                        </li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
