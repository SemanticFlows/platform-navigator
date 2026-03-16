import { StartupCard } from "@/components/StartupCard"
import { CommandBar } from "@/components/CommandBar"
import { useStartups } from "@/hooks/useStartup"

import { Search, LayoutGrid, GitBranch } from "lucide-react"
import { useState } from "react"

const DiscoverPage = () => {

  const [view, setView] = useState<"grid" | "graph">("grid")

  const { data: startups, isLoading, error } = useStartups()

  return (
    <div className="max-w-[1440px] mx-auto px-10 py-8">

      {/* Header */}

      <div className="flex items-end justify-between mb-6">
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
          className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2 text-sm text-muted-foreground hover:border-primary/30 transition-colors w-[280px]"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search startups...</span>
          <kbd className="text-[10px] font-mono-tabular bg-muted px-1.5 py-0.5 rounded ml-auto">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* View Toggle */}

      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setView("grid")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === "grid"
              ? "bg-primary text-primary-foreground"
              : "bg-card border text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          Grid view
        </button>

        <button
          onClick={() => setView("graph")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === "graph"
              ? "bg-primary text-primary-foreground"
              : "bg-card border text-muted-foreground hover:text-foreground"
          }`}
        >
          <GitBranch className="h-4 w-4" />
          Graph view
        </button>

      </div>

      {/* Loading */}

      {isLoading && (
        <div className="flex justify-center py-20 text-muted-foreground">
          Loading startups...
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="flex justify-center py-20 text-red-500">
          Failed to load startups
        </div>
      )}

      {/* Content */}

      {!isLoading && startups && (
        <>
          {view === "grid" ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {startups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}

            </div>

          ) : (

            <div className="surface-card p-12 flex items-center justify-center min-h-[400px]">

              <div className="text-center">
                <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />

                <p className="text-muted-foreground text-sm">
                  Interactive graph visualization coming soon.
                </p>

                <p className="text-muted-foreground text-xs mt-1">
                  Explore startup connections and categories visually.
                </p>
              </div>

            </div>

          )}
        </>
      )}

      <CommandBar />

    </div>
  )
}

export default DiscoverPage