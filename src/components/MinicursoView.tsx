import { useState } from "react";
import { MINICURSO_SLIDES, ROADMAP_STAGES } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";

interface MinicursoViewProps {
  stageId: string;
}

export function MinicursoView({ stageId }: MinicursoViewProps) {
  const stage = ROADMAP_STAGES.find((s) => s.id === stageId);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<
    Record<number, { clarity: string; missing: string; suggestion: string }>
  >({});
  const [loading, setLoading] = useState(false);
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());

  const slide = MINICURSO_SLIDES[currentSlide];

  const handleContinue = () => {
    if (!answers[currentSlide]?.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setFeedback((prev) => ({
        ...prev,
        [currentSlide]: {
          clarity: "Your response is well-structured and demonstrates understanding of the core concept. The argument flows logically.",
          missing: "Consider adding quantitative data to support your claims. Market sizing would benefit from specific sources.",
          suggestion: "Try to include 2-3 concrete examples from your industry to strengthen your analysis further.",
        },
      }));
      setCompletedSlides((prev) => new Set([...prev, currentSlide]));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="w-full mb-6">
        <p className="text-xs uppercase tracking-widest text-primary font-mono-tabular mb-1">
          {stage?.title || "Module"}
        </p>
        <h2 className="text-display text-foreground">{slide.title}</h2>
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center gap-2 mb-8">
        {MINICURSO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentSlide
                ? "bg-primary scale-125"
                : completedSlides.has(i)
                ? "bg-success"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Slide Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="surface-card p-8 w-full max-w-[760px]"
        >
          {/* Markdown Content */}
          <div className="prose prose-sm max-w-none mb-6">
            <p className="text-body text-foreground leading-relaxed">{slide.content}</p>
          </div>

          {/* Question Block */}
          <div className="bg-accent rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-foreground mb-3">{slide.question}</p>
            <textarea
              value={answers[currentSlide] || ""}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [currentSlide]: e.target.value }))
              }
              placeholder="Type your answer..."
              rows={5}
              className="w-full bg-card border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* AI Feedback Panel */}
          {feedback[currentSlide] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border border-primary/10 rounded-lg p-5 mb-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI Feedback</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-success mb-1">Clarity</p>
                  <p className="text-sm text-foreground">{feedback[currentSlide].clarity}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-destructive mb-1">Missing Information</p>
                  <p className="text-sm text-foreground">{feedback[currentSlide].missing}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-primary mb-1">Suggestion</p>
                  <p className="text-sm text-foreground">{feedback[currentSlide].suggestion}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <Button
              variant="ghost"
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex gap-2">
              {!feedback[currentSlide] && (
                <Button
                  onClick={handleContinue}
                  disabled={!answers[currentSlide]?.trim() || loading}
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                  Continue
                </Button>
              )}
              {feedback[currentSlide] && currentSlide < MINICURSO_SLIDES.length - 1 && (
                <Button onClick={() => setCurrentSlide(currentSlide + 1)}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide counter */}
      <p className="text-xs text-muted-foreground mt-6 font-mono-tabular">
        {currentSlide + 1} / {MINICURSO_SLIDES.length}
      </p>
    </div>
  );
}
