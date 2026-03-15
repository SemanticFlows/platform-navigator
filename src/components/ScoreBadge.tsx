import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getScoreColor(score: number) {
  if (score >= 80) return "bg-success text-success-foreground";
  if (score >= 60) return "bg-primary text-primary-foreground";
  return "bg-muted text-muted-foreground";
}

export function ScoreBadge({ score, size = "md", className }: ScoreBadgeProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
  };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold font-mono-tabular",
        getScoreColor(score),
        sizeClasses[size],
        className
      )}
    >
      {score}
    </div>
  );
}
