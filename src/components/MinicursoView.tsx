import { useState } from "react";
import { MINICURSO_SLIDES, ROADMAP_STAGES } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface MinicursoViewProps {
  stageId: string;
}

export function MinicursoView({ stageId }: MinicursoViewProps) {
  const stage = ROADMAP_STAGES.find((s) => s.id === stageId);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());

  const slide = MINICURSO_SLIDES[currentSlide];

  const handleContinue = () => {
    if (!answers[currentSlide]?.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setFeedback((prev) => ({
        ...prev,
        [currentSlide]:
          "Good analysis. Your response demonstrates understanding of the core concept. Consider expanding on the competitive differentiation aspect for a stronger position.",
      }));
      setCompletedSlides((prev) => new Set([...prev, currentSlide]));
      setLoading(false);
    }, 800);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      <h2 className="text-display text-foreground mb-2">{stage?.title || "Module"}</h2>
      <p className="text-muted-foreground text-sm mb-8">Minicurso — Slide {currentSlide + 1} of {MINICURSO_SLIDES.length}</p>

      {/* Navigation Circles */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {MINICURSO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === currentSlide
                ? "bg-primary"
                : completedSlides.has(i)
                ? "bg-success"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="surface-card p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-section-heading text-foreground mb-4">{slide.title}</h3>
          <p className="text-body text-foreground mb-6">{slide.content}</p>

          {/* Question */}
          <div className="bg-accent rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-foreground mb-3">{slide.question}</p>
            <textarea
              value={answers[currentSlide] || ""}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [currentSlide]: e.target.value }))
              }
              placeholder="Type your answer..."
              rows={4}
              className="w-full bg-card border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Feedback */}
          {feedback[currentSlide] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg mb-4"
            >
              <p className="text-sm text-foreground">{feedback[currentSlide]}</p>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-6">
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
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : null}
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

      {/* Arrow Navigation */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() =>
            setCurrentSlide(Math.min(MINICURSO_SLIDES.length - 1, currentSlide + 1))
          }
          disabled={currentSlide === MINICURSO_SLIDES.length - 1}
          className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
