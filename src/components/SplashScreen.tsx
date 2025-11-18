import { useEffect, useState } from "react";
import { Cloud, Zap, TrendingDown, DollarSign, Sparkles } from "lucide-react";

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: Zap, text: "Initializing AI Engine..." },
    { icon: TrendingDown, text: "Loading Cost Analytics..." },
    { icon: DollarSign, text: "Calculating Savings..." },
    { icon: Sparkles, text: "Optimizing Dashboard..." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);

    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(featureInterval);
    };
  }, [onFinish]);

  const CurrentIcon = features[currentFeature].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-card to-primary/20 flex items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
      
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative text-center space-y-12 px-4 animate-in fade-in duration-1000">
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-2 border-2 border-accent/30 rounded-full animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent shadow-2xl shadow-primary/50">
              <Cloud className="h-10 w-10 text-primary-foreground animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Cloud Cost Analyzer
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-accent">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <p className="text-lg font-semibold">AI-Powered Optimization Platform</p>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
        </div>

        <div className="h-12 flex items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground animate-in fade-in duration-300">
            <CurrentIcon className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">{features[currentFeature].text}</span>
          </div>
        </div>

        <div className="w-80 mx-auto space-y-3">
          <div className="relative h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 shadow-lg shadow-primary/50"
              style={{ 
                width: `${progress}%`,
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite"
              }}
            />
            <div
              className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
              style={{ 
                left: `${Math.max(0, progress - 20)}%`,
                transition: "left 0.3s"
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-primary">{progress.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">Powered by Lovable AI</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
          {["Multi-Cloud", "Real-time", "AI-Driven", "Cost Savings"].map((tag, i) => (
            <div
              key={tag}
              className="px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-xs text-muted-foreground backdrop-blur-sm animate-in fade-in"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};
