import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, TrendingDown, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TagFilterData {
  environment: string;
  department: string;
  project: string;
  cost: number;
  change: number;
}

const tagData: TagFilterData[] = [
  { environment: "production", department: "backend", project: "sih-2025", cost: 8234, change: 15.2 },
  { environment: "production", department: "ai", project: "college-app", cost: 5123, change: 22.8 },
  { environment: "testing", department: "frontend", project: "research", cost: 2890, change: -8.5 },
  { environment: "development", department: "ai", project: "sih-2025", cost: 1456, change: 5.3 },
  { environment: "staging", department: "backend", project: "college-app", cost: 729, change: -12.1 },
];

export const TagFilters = () => {
  const [selectedEnv, setSelectedEnv] = useState<string>("all");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<string>("all");

  const filteredData = tagData.filter((item) => {
    return (
      (selectedEnv === "all" || item.environment === selectedEnv) &&
      (selectedDept === "all" || item.department === selectedDept) &&
      (selectedProject === "all" || item.project === selectedProject)
    );
  });

  const totalCost = filteredData.reduce((sum, item) => sum + item.cost, 0);
  const avgChange =
    filteredData.length > 0
      ? filteredData.reduce((sum, item) => sum + item.change, 0) / filteredData.length
      : 0;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Tag-Based Cost Segmentation
        </CardTitle>
        <CardDescription>
          Filter costs by environment, department, and project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Environment</label>
            <Select value={selectedEnv} onValueChange={setSelectedEnv}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Environments</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Department</label>
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="ai">AI Team</SelectItem>
                <SelectItem value="backend">Backend Team</SelectItem>
                <SelectItem value="frontend">Frontend Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Project</label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="sih-2025">SIH 2025</SelectItem>
                <SelectItem value="college-app">College App</SelectItem>
                <SelectItem value="research">Research</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-lg border border-border/30">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Filtered Total Cost</p>
            <p className="text-2xl font-bold text-foreground">
              ${totalCost.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Average Change</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">
                {avgChange > 0 ? "+" : ""}
                {avgChange.toFixed(1)}%
              </p>
              {avgChange > 0 ? (
                <TrendingUp className="h-5 w-5 text-destructive" />
              ) : (
                <TrendingDown className="h-5 w-5 text-accent" />
              )}
            </div>
          </div>
        </div>

        {/* Filtered Results */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">
            Filtered Results ({filteredData.length})
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-border/30 hover:bg-secondary/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.environment}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.department}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.project}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">
                    ${item.cost.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      item.change > 0 ? "text-destructive" : "text-accent"
                    }`}
                  >
                    {item.change > 0 ? "↑" : "↓"} {Math.abs(item.change)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
