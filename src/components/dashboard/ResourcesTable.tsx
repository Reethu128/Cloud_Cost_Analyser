import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { topResources } from "@/lib/mockData";

export const ResourcesTable = () => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Top Resources by Cost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Resource Name
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Service
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Region
                </th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                  Cost
                </th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                  Utilization
                </th>
                <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {topResources.map((resource) => (
                <tr
                  key={resource.id}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-3 px-2 text-sm font-medium text-foreground">
                    {resource.name}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">{resource.service}</td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">{resource.region}</td>
                  <td className="py-3 px-2 text-sm font-semibold text-foreground text-right">
                    ${resource.cost.toLocaleString()}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground text-right">
                    {resource.utilization}%
                  </td>
                  <td className="py-3 px-2 text-center">
                    <Badge
                      variant={
                        resource.status === "active"
                          ? "default"
                          : resource.status === "idle"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        resource.status === "active"
                          ? "bg-accent/20 text-accent border-accent/30"
                          : resource.status === "idle"
                          ? "bg-destructive/20 text-destructive border-destructive/30"
                          : "bg-warning/20 text-warning border-warning/30"
                      }
                    >
                      {resource.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
