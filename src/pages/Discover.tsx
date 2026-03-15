import { STARTUPS } from "@/data/mockData";
import { StartupCard } from "@/components/StartupCard";
import { CommandBar } from "@/components/CommandBar";
import { Search } from "lucide-react";

const DiscoverPage = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-8 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-display text-foreground">Discover</h1>
          <p className="text-body text-muted-foreground mt-2">
            Explore startups, evaluate readiness, and find opportunities.
          </p>
        </div>
        <button
          onClick={() =>
            window.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true })
            )
          }
          className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2 text-sm text-muted-foreground hover:border-primary/30 transition-colors"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search...</span>
          <kbd className="text-[10px] font-mono-tabular bg-muted px-1.5 py-0.5 rounded ml-4">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STARTUPS.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>

      <CommandBar />
    </div>
  );
};

export default DiscoverPage;
