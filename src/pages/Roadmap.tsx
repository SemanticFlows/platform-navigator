import { ROADMAP_STAGES } from "@/data/mockData";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { CheckCircle2, Circle, PlayCircle, ArrowRight, ArrowLeft, BookOpen, MessageCircle, PenTool, Sparkles, User, ChevronRight } from "lucide-react";
import { MinicursoView } from "@/components/MinicursoView";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function StatusIcon({ status }: { status: "completed" | "active" | "pending" }) {
  if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-success" />;
  if (status === "active") return <PlayCircle className="h-5 w-5 text-primary" />;
  return <Circle className="h-5 w-5 text-muted-foreground" />;
}

function ModuleTypeIcon({ type }: { type: "lesson" | "interview" | "exercise" }) {
  if (type === "lesson") return <BookOpen className="h-4 w-4" />;
  if (type === "interview") return <MessageCircle className="h-4 w-4" />;
  return <PenTool className="h-4 w-4" />;
}

function StatusLabel({ status }: { status: "completed" | "active" | "pending" }) {
  const map = {
    completed: { label: "Completed", cls: "bg-success/10 text-success" },
    active: { label: "In Progress", cls: "bg-primary/10 text-primary" },
    pending: { label: "Not Started", cls: "bg-muted text-muted-foreground" },
  };
  const s = map[status];
  return <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${s.cls}`}>{s.label}</span>;
}

const RoadmapPage = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 480, behavior: "smooth" });
  };

  if (selectedStage) {
    return (
      <div className="max-w-[1440px] mx-auto px-10 py-8">
        <button
          onClick={() => setSelectedStage(null)}
          className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back to Roadmap
        </button>
        <MinicursoView stageId={selectedStage} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-10 pt-8 pb-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-display text-foreground">Roadmap</h1>
            <p className="text-body text-muted-foreground mt-2">
              From vision to readiness. Quantify your startup's momentum.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              className="h-9 w-9 rounded-lg border border-border bg-background hover:bg-accent flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-foreground" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="h-9 w-9 rounded-lg border border-border bg-background hover:bg-accent flex items-center justify-center transition-colors"
            >
              <ArrowRight className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll area */}
      <div className="flex-1 overflow-hidden px-10 pb-8">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-4 h-full snap-x snap-mandatory scrollbar-thin"
          style={{ scrollbarWidth: "thin" }}
        >
          {ROADMAP_STAGES.map((stage, i) => {
            const completedCount = stage.modules.filter((m) => m.completed).length;
            const totalCount = stage.modules.length;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex-shrink-0 w-[440px] snap-start flex flex-col surface-card rounded-2xl overflow-hidden"
              >
                {/* Stage Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <StatusIcon status={stage.status} />
                      <h2 className="text-xl font-semibold text-foreground">{stage.title}</h2>
                    </div>
                    <StatusLabel status={stage.status} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.progress}%` }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                    <span className="text-sm font-mono-tabular text-muted-foreground w-16 text-right">
                      {completedCount}/{totalCount}
                    </span>
                  </div>
                </div>

                {/* Modules List — scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {stage.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className={`rounded-xl border transition-colors ${
                        mod.completed
                          ? "border-border bg-background"
                          : "border-border/50 bg-muted/30"
                      }`}
                    >
                      {/* Module header */}
                      <div className="flex items-center gap-3 p-4 pb-3">
                        <div className={`p-1.5 rounded-lg ${mod.completed ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                          <ModuleTypeIcon type={mod.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${mod.completed ? "text-foreground" : "text-muted-foreground"}`}>
                            {mod.title}
                          </p>
                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            {mod.type}
                          </span>
                        </div>
                        {mod.completed && <CheckCircle2 className="h-4 w-4 text-success shrink-0" />}
                      </div>

                      {/* User Input Summary */}
                      {mod.summary && (
                        <div className="mx-4 mb-3 rounded-lg bg-accent/60 p-3">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Your Input</span>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed">{mod.summary}</p>
                        </div>
                      )}

                      {/* AI Digest */}
                      {mod.aiDigest && (
                        <div className="mx-4 mb-3 rounded-lg bg-primary/5 border border-primary/10 p-3">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Sparkles className="h-3 w-3 text-primary" />
                            <span className="text-[10px] uppercase tracking-widest text-primary font-medium">AI Analysis</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{mod.aiDigest}</p>
                        </div>
                      )}

                      {/* Pending state */}
                      {!mod.completed && !mod.summary && (
                        <div className="mx-4 mb-3 rounded-lg border border-dashed border-border p-3 flex items-center justify-center">
                          <p className="text-xs text-muted-foreground italic">Awaiting your input</p>
                        </div>
                      )}

                      {/* Action */}
                      <div className="px-4 pb-3">
                        <button
                          onClick={() => setSelectedStage(stage.id)}
                          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          {mod.completed ? "Review module" : "Start module"}
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stage Footer */}
                <div className="p-4 border-t border-border bg-muted/30">
                  <button
                    onClick={() => setSelectedStage(stage.id)}
                    className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Open {stage.title}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Readiness Score */}
      <div className="px-10 pb-8">
        <div className="surface-card p-8 rounded-2xl">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold font-mono-tabular text-primary-foreground">84</span>
            </div>
            <div>
              <h2 className="text-section-heading text-foreground mb-1">Startup Readiness</h2>
              <p className="text-sm font-mono-tabular text-muted-foreground uppercase tracking-widest mb-2">
                Readiness Score
              </p>
              <p className="text-sm text-muted-foreground max-w-lg">
                Based on 5 evaluation categories: Vision, Market, Product, Business, and Marketing.
                Complete more modules to improve your score.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
