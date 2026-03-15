import { ROADMAP_STAGES } from "@/data/mockData";
import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Circle, PlayCircle, ArrowRight, BookOpen, MessageCircle, PenTool } from "lucide-react";
import { MinicursoView } from "@/components/MinicursoView";

function StatusIcon({ status }: { status: "completed" | "active" | "pending" }) {
  if (status === "completed") return <CheckCircle2 className="h-4 w-4 text-success" />;
  if (status === "active") return <PlayCircle className="h-4 w-4 text-primary" />;
  return <Circle className="h-4 w-4 text-muted-foreground" />;
}

function ModuleTypeIcon({ type }: { type: "lesson" | "interview" | "exercise" }) {
  if (type === "lesson") return <BookOpen className="h-3.5 w-3.5" />;
  if (type === "interview") return <MessageCircle className="h-3.5 w-3.5" />;
  return <PenTool className="h-3.5 w-3.5" />;
}

const RoadmapPage = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

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
    <div className="max-w-[1440px] mx-auto px-10 py-8">
      <div className="mb-8">
        <h1 className="text-display text-foreground">Roadmap</h1>
        <p className="text-body text-muted-foreground mt-2">
          From vision to readiness. Quantify your startup's momentum.
        </p>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {ROADMAP_STAGES.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex-shrink-0 w-[280px] flex flex-col"
          >
            {/* Column Header */}
            <div className="surface-card p-4 mb-3 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StatusIcon status={stage.status} />
                  <h3 className="font-semibold text-foreground">{stage.title}</h3>
                </div>
                <span className="text-xs font-mono-tabular text-muted-foreground">
                  {stage.progress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.progress}%` }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>

            {/* Module Cards */}
            <div className="space-y-3">
              {stage.modules.map((mod) => (
                <motion.div
                  key={mod.id}
                  whileHover={{ y: -2 }}
                  className="surface-card-hover p-4 rounded-xl flex flex-col gap-3"
                >
                  {/* Module Title */}
                  <div className="flex items-start gap-2">
                    <div className={`mt-0.5 ${mod.completed ? "text-success" : "text-muted-foreground"}`}>
                      <ModuleTypeIcon type={mod.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${mod.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {mod.title}
                      </p>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {mod.type}
                      </span>
                    </div>
                  </div>

                  {/* User Summary */}
                  {mod.summary && (
                    <div className="bg-accent rounded-lg p-2.5">
                      <p className="text-xs text-foreground">{mod.summary}</p>
                    </div>
                  )}

                  {/* AI Digest */}
                  {mod.aiDigest && (
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-2.5">
                      <p className="text-xs text-primary font-medium mb-0.5">AI Insight</p>
                      <p className="text-xs text-muted-foreground">{mod.aiDigest}</p>
                    </div>
                  )}

                  {/* Open Action */}
                  <button
                    onClick={() => setSelectedStage(stage.id)}
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors self-end"
                  >
                    Open module
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Startup Readiness Score */}
      <div className="mt-10 surface-card p-8">
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
  );
};

export default RoadmapPage;
