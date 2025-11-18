import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CloudPricing {
  provider: "AWS" | "Azure" | "GCP";
  computePerHour: number;
  storagePerGB: number;
  egressPerGB: number;
  color: string;
}

const cloudPricing: CloudPricing[] = [
  {
    provider: "AWS",
    computePerHour: 0.096,
    storagePerGB: 0.023,
    egressPerGB: 0.09,
    color: "from-orange-500/20 to-orange-600/20",
  },
  {
    provider: "Azure",
    computePerHour: 0.088,
    storagePerGB: 0.025,
    egressPerGB: 0.087,
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    provider: "GCP",
    computePerHour: 0.084,
    storagePerGB: 0.020,
    egressPerGB: 0.085,
    color: "from-green-500/20 to-green-600/20",
  },
];

interface StorageTier {
  name: string;
  aws: string;
  azure: string;
  gcp: string;
  costMultiplier: number;
}

const storageTiers: StorageTier[] = [
  { name: "Hot (Standard)", aws: "S3 Standard", azure: "Hot Tier", gcp: "Standard", costMultiplier: 1.0 },
  { name: "Cool (Infrequent)", aws: "S3 IA", azure: "Cool Tier", gcp: "Nearline", costMultiplier: 0.5 },
  { name: "Cold (Archive)", aws: "Glacier", azure: "Archive Tier", gcp: "Coldline", costMultiplier: 0.2 },
  { name: "Deep Archive", aws: "Deep Archive", azure: "Archive (Cold)", gcp: "Archive", costMultiplier: 0.1 },
];

export const CloudComparison = () => {
  const [selectedProvider, setSelectedProvider] = useState<"AWS" | "Azure" | "GCP">("AWS");

  // Sample workload calculations
  const computeHours = 730; // Monthly hours
  const storageGB = 1000;
  const egressGB = 500;

  const calculateCost = (provider: CloudPricing) => {
    return (
      provider.computePerHour * computeHours +
      provider.storagePerGB * storageGB +
      provider.egressPerGB * egressGB
    );
  };

  const costs = cloudPricing.map((provider) => ({
    provider: provider.provider,
    cost: calculateCost(provider),
    color: provider.color,
  }));

  const cheapest = costs.reduce((prev, curr) => (curr.cost < prev.cost ? curr : prev));
  const currentCost = costs.find((c) => c.provider === selectedProvider)!.cost;
  const potentialSavings = currentCost - cheapest.cost;
  const savingsPercentage = (potentialSavings / currentCost) * 100;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          Multi-Cloud Cost Comparison
        </CardTitle>
        <CardDescription>
          Compare pricing across AWS, Azure, and GCP for your workload
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Provider Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Your Current Provider
          </label>
          <div className="flex gap-2">
            {cloudPricing.map((provider) => (
              <Button
                key={provider.provider}
                variant={selectedProvider === provider.provider ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedProvider(provider.provider)}
                className={
                  selectedProvider === provider.provider
                    ? `bg-gradient-to-r ${provider.color.replace(/\/20/g, "")} hover:opacity-90`
                    : ""
                }
              >
                <Cloud className="mr-2 h-4 w-4" />
                {provider.provider}
              </Button>
            ))}
          </div>
        </div>

        {/* Cost Comparison Table */}
        <div className="border border-border/50 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead className="text-right">Compute</TableHead>
                <TableHead className="text-right">Storage</TableHead>
                <TableHead className="text-right">Egress</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cloudPricing.map((provider) => {
                const cost = calculateCost(provider);
                const isSelected = provider.provider === selectedProvider;
                const isCheapest = provider.provider === cheapest.provider;

                return (
                  <TableRow
                    key={provider.provider}
                    className={isSelected ? "bg-primary/5" : ""}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {provider.provider}
                        {isSelected && (
                          <Badge variant="outline" className="text-xs">
                            Current
                          </Badge>
                        )}
                        {isCheapest && (
                          <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
                            Cheapest
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${(provider.computePerHour * computeHours).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${(provider.storagePerGB * storageGB).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${(provider.egressPerGB * egressGB).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ${cost.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Savings Potential */}
        {potentialSavings > 0 && (
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <TrendingDown className="h-5 w-5 text-accent mt-1" />
              <div className="space-y-2 flex-1">
                <h4 className="font-semibold text-foreground">Migration Savings Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Migrating from {selectedProvider} to {cheapest.provider} could save you
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-accent">
                    ${potentialSavings.toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground">/month</span>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    {savingsPercentage.toFixed(1)}% cheaper
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Annual savings: ${(potentialSavings * 12).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Storage Tier Comparison */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            Storage Tier Comparison
          </h4>
          <div className="border border-border/50 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tier Type</TableHead>
                  <TableHead>AWS</TableHead>
                  <TableHead>Azure</TableHead>
                  <TableHead>GCP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {storageTiers.map((tier) => (
                  <TableRow key={tier.name}>
                    <TableCell className="font-medium">{tier.name}</TableCell>
                    <TableCell>{tier.aws}</TableCell>
                    <TableCell>{tier.azure}</TableCell>
                    <TableCell>{tier.gcp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground">
            💡 GCP offers 4 storage tiers with Coldline being ~15% cheaper than AWS Glacier
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
