import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  aiInsight?: {
    analysis: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
}

export function SectionCard({ title, children, defaultOpen = false, aiInsight }: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="surface-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 border-b hover:bg-accent/30 transition-colors"
      >
        <h3 className="text-section-heading text-foreground">{title}</h3>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5">{children}</div>

            {/* AI Insight Panel */}
            {aiInsight && (
              <div className="mx-6 mb-5 rounded-lg bg-primary/5 border border-primary/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">AI Analysis</span>
                </div>
                <p className="text-sm text-foreground mb-3">{aiInsight.analysis}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs font-medium text-success mb-1.5">Strengths</p>
                    <ul className="space-y-1">
                      {aiInsight.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="text-success mt-0.5">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-destructive mb-1.5">Weaknesses</p>
                    <ul className="space-y-1">
                      {aiInsight.weaknesses.map((w, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="text-destructive mt-0.5">•</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary mb-1.5">Recommendations</p>
                    <ul className="space-y-1">
                      {aiInsight.recommendations.map((r, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
