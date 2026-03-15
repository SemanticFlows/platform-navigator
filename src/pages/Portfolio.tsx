import { useParams, useNavigate } from "react-router-dom";
import { STARTUPS } from "@/data/mockData";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, ChevronDown, ChevronUp } from "lucide-react";

const TABS = ["Overview", "Market", "Product", "Business", "Metrics", "Score"] as const;

function SectionCard({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="surface-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 border-b hover:bg-accent/30 transition-colors"
      >
        <h3 className="text-section-heading">{title}</h3>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const PortfolioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");
  const startup = STARTUPS.find((s) => s.id === id) || STARTUPS[0];

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-10">
      {/* Header */}
      <div className="surface-card p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-display text-foreground">{startup.name}</h1>
              <ScoreBadge score={startup.score} size="lg" />
            </div>
            <p className="text-body text-muted-foreground">{startup.tagline}</p>
            <div className="flex gap-2 mt-3">
              <span className="text-xs font-medium bg-accent px-2.5 py-1 rounded-md text-accent-foreground">
                {startup.category}
              </span>
              <span className="text-xs font-medium bg-muted px-2.5 py-1 rounded-md text-muted-foreground">
                {startup.stage}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/marketing/${startup.id}`)}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Marketing Page
            </Button>
            <Button variant="ghost">
              <Heart className="h-4 w-4 mr-1" />
              Follow
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6 relative">
        <div className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {activeTab === "Overview" && (
            <>
              <SectionCard title="About" defaultOpen>
                <p className="text-body text-foreground">{startup.description}</p>
              </SectionCard>
              <SectionCard title="Problem" defaultOpen>
                <p className="text-body text-foreground">{startup.problem}</p>
              </SectionCard>
              <SectionCard title="Solution" defaultOpen>
                <p className="text-body text-foreground">{startup.solution}</p>
              </SectionCard>
            </>
          )}
          {activeTab === "Market" && (
            <>
              <SectionCard title="TAM / SAM / SOM" defaultOpen>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "TAM", value: startup.tam },
                    { label: "SAM", value: startup.sam },
                    { label: "SOM", value: startup.som },
                  ].map((m) => (
                    <div key={m.label} className="text-center p-4 bg-accent rounded-lg">
                      <p className="text-label text-muted-foreground mb-1">{m.label}</p>
                      <p className="text-2xl font-bold font-mono-tabular text-foreground">{m.value}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
              <SectionCard title="Competitors">
                <ul className="space-y-2">
                  {startup.competitors.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>
              </SectionCard>
              <SectionCard title="Trends">
                <div className="flex flex-wrap gap-2">
                  {startup.trends.map((t) => (
                    <span key={t} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </SectionCard>
            </>
          )}
          {activeTab === "Product" && (
            <SectionCard title="Features" defaultOpen>
              <div className="grid grid-cols-2 gap-3">
                {startup.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 p-3 bg-accent rounded-lg text-sm text-foreground">
                    <div className="w-2 h-2 rounded-full bg-success shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
          {activeTab === "Business" && (
            <>
              <SectionCard title="Business Model" defaultOpen>
                <p className="text-body text-foreground">{startup.businessModel}</p>
              </SectionCard>
              <SectionCard title="Revenue" defaultOpen>
                <p className="text-3xl font-bold font-mono-tabular text-foreground">{startup.revenue}</p>
              </SectionCard>
              <SectionCard title="Team" defaultOpen>
                <p className="text-body text-foreground">{startup.teamSize} team members</p>
              </SectionCard>
            </>
          )}
          {activeTab === "Metrics" && (
            <SectionCard title="Key Metrics" defaultOpen>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-label text-muted-foreground">Revenue</p>
                  <p className="text-xl font-bold font-mono-tabular text-foreground">{startup.revenue}</p>
                </div>
                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-label text-muted-foreground">Team Size</p>
                  <p className="text-xl font-bold font-mono-tabular text-foreground">{startup.teamSize}</p>
                </div>
                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-label text-muted-foreground">Market Capture</p>
                  <p className="text-xl font-bold font-mono-tabular text-foreground">12.4%</p>
                </div>
                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-label text-muted-foreground">Growth Rate</p>
                  <p className="text-xl font-bold font-mono-tabular text-foreground">+24% MoM</p>
                </div>
              </div>
            </SectionCard>
          )}
          {activeTab === "Score" && (
            <SectionCard title="Readiness Score" defaultOpen>
              <div className="flex flex-col items-center py-8">
                <ScoreBadge score={startup.score} size="lg" />
                <p className="text-sm text-muted-foreground mt-3 font-mono-tabular uppercase tracking-widest">
                  Readiness Score
                </p>
                <div className="w-full max-w-md mt-6 space-y-3">
                  {["Vision", "Market", "Product", "Business", "Team"].map((cat, i) => {
                    const catScore = Math.max(40, startup.score - i * 5 + Math.floor(Math.random() * 10));
                    return (
                      <div key={cat} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-20">{cat}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${catScore}%` }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                        <span className="text-xs font-mono-tabular text-muted-foreground w-8">
                          {catScore}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SectionCard>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
