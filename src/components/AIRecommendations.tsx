import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AIRecommendationsProps {
  costData: any;
  resources: any[];
}

export const AIRecommendations = ({ costData, resources }: AIRecommendationsProps) => {
  const [analysis, setAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getAIAnalysis = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-costs', {
        body: { costData, resources }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast({
        title: "AI Analysis Complete",
        description: "Smart recommendations generated successfully",
      });
    } catch (error: any) {
      console.error('Error getting AI analysis:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to generate recommendations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI-Powered Cost Optimization
        </CardTitle>
        <CardDescription>
          Get intelligent recommendations based on machine learning analysis of your cloud spending patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <Button
            onClick={getAIAnalysis}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing your cloud costs...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI Recommendations
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-sm text-foreground">
                {analysis}
              </div>
            </div>
            <Button
              onClick={getAIAnalysis}
              variant="outline"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                "Refresh Analysis"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
