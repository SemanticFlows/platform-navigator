import { ROADMAP_STAGES } from "@/data/mockData";
import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { MinicursoView } from "@/components/MinicursoView";

function StatusIcon({ status }: { status: "completed" | "active" | "pending" }) {
  if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-success" />;
  if (status === "active") return <PlayCircle className="h-5 w-5 text-primary" />;
  return <Circle className="h-5 w-5 text-muted-foreground" />;
}

const RoadmapPage = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  if (selectedStage) {
    return (
      <div className="max-w-[1440px] mx-auto px-8 py-10">
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
    <div className="max-w-[1440px] mx-auto px-8 py-10">
      <div className="mb-8">
        <h1 className="text-display text-foreground">Roadmap</h1>
        <p className="text-body text-muted-foreground mt-2">
          From vision to readiness. Quantify your startup's momentum.
        </p>
      </div>

      {/* Stage Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {ROADMAP_STAGES.map((stage, i) => (
          <motion.button
            key={stage.id}
            onClick={() => setSelectedStage(stage.id)}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="surface-card-hover flex flex-col p-6 text-left"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg tracking-tight text-foreground">{stage.title}</h3>
              <StatusIcon status={stage.status} />
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stage.progress}%` }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
            <span className="text-xs font-mono-tabular text-muted-foreground uppercase tracking-widest">
              {stage.progress}% Complete
            </span>
            <span className="text-xs text-muted-foreground mt-2">
              {stage.modules} modules
            </span>
          </motion.button>
        ))}
      </div>

      {/* Overall Score */}
      <div className="mt-12 surface-card p-8 text-center">
        <h2 className="text-section-heading text-foreground mb-2">Startup Readiness</h2>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <span className="text-2xl font-bold font-mono-tabular text-primary-foreground">84</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-mono-tabular text-muted-foreground uppercase tracking-widest">
              Readiness Score
            </p>
            <p className="text-xs text-muted-foreground mt-1">Based on 5 evaluation categories</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
