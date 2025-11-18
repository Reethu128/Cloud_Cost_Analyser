import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud } from "lucide-react";

interface CloudProviderSelectorProps {
  selected: "aws" | "azure" | "gcp";
  onSelect: (provider: "aws" | "azure" | "gcp") => void;
}

export const CloudProviderSelector = ({ selected, onSelect }: CloudProviderSelectorProps) => {
  const providers = [
    { id: "aws" as const, name: "AWS", color: "from-orange-500 to-orange-600" },
    { id: "azure" as const, name: "Azure", color: "from-blue-500 to-blue-600" },
    { id: "gcp" as const, name: "GCP", color: "from-green-500 to-green-600" },
  ];

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Cloud Provider:</span>
          <div className="flex gap-2 flex-wrap">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                variant={selected === provider.id ? "default" : "outline"}
                size="sm"
                onClick={() => onSelect(provider.id)}
                className={
                  selected === provider.id
                    ? `bg-gradient-to-r ${provider.color} hover:opacity-90`
                    : ""
                }
              >
                <Cloud className="mr-2 h-4 w-4" />
                {provider.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
