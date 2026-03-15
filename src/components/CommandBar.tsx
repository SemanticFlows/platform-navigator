import { useEffect, useState, useCallback } from "react";
import { STARTUPS } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScoreBadge } from "@/components/ScoreBadge";

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const results = query.length > 0
    ? STARTUPS.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.category.toLowerCase().includes(query.toLowerCase())
      )
    : STARTUPS;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[selectedIndex]) {
        navigate(`/portfolio/${results[selectedIndex].id}`);
        setOpen(false);
      }
    },
    [open, results, selectedIndex, navigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[520px] z-50 bg-card border rounded-xl overflow-hidden"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search startups..."
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="text-[10px] font-mono-tabular bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-1">
              {results.length === 0 ? (
                <p className="text-sm text-muted-foreground px-4 py-6 text-center">
                  No startups found.
                </p>
              ) : (
                results.map((startup, i) => (
                  <button
                    key={startup.id}
                    onClick={() => {
                      navigate(`/portfolio/${startup.id}`);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                      i === selectedIndex
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground">{startup.name}</span>
                      <span className="text-muted-foreground text-xs bg-muted px-2 py-0.5 rounded-full">
                        {startup.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ScoreBadge score={startup.score} size="sm" />
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
