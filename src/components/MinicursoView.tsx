import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { useRoadmap } from "@/hooks/useRoadmap";
import { useStartups } from "@/hooks/useStartup";

import { StageExplorationFlow } from "./StageIAFLow";

interface MinicursoViewProps {
  stageId: string;
}

export function MinicursoView({ stageId }: MinicursoViewProps) {

  const { data:startups } = useStartups()
  const startup = startups?.[0]

  const { data:roadmapStages, isLoading } =
    useRoadmap(startup?.id)

  const stage =
    roadmapStages?.find((s)=>s.id === stageId)

  const slides = stage?.modules ?? []

  const [currentSlide,setCurrentSlide] = useState(0)

  const [answers,setAnswers] =
    useState<Record<number,string>>({})

  const [feedback,setFeedback] =
    useState<Record<number,{
      clarity:string
      missing:string
      suggestion:string
    }>>({})

  const [loading,setLoading] = useState(false)

  const [completedSlides,setCompletedSlides] =
    useState<Set<number>>(new Set())

  if(isLoading){
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        Loading module...
      </div>
    )
  }

  const slide = slides[currentSlide]

  if(!slide){
    return null
  }

  const handleContinue = () => {

    if(!answers[currentSlide]?.trim()) return

    setLoading(true)

    setTimeout(()=>{

      setFeedback(prev => ({
        ...prev,
        [currentSlide]:{
          clarity:
            "Your response is well structured and demonstrates understanding.",
          missing:
            "Consider adding quantitative market data.",
          suggestion:
            "Include 2–3 examples from your sector."
        }
      }))

      setCompletedSlides(prev =>
        new Set([...prev,currentSlide])
      )

      setLoading(false)

    },800)

  }

  return (

    <div className="flex flex-col items-center min-h-[calc(100vh-120px)]">

      {/* Header */}

      <div className="w-full mb-6">

        <p className="text-xs uppercase tracking-widest text-primary font-mono-tabular mb-1">
          {stage?.title ?? "Module"}
        </p>

        <h2 className="text-display text-foreground">
          {slide.title}
        </h2>

      </div>

      {/* Slide Indicators */}

      <div className="flex items-center gap-2 mb-8">

        {slides.map((_,i)=>(
          <button
            key={i}
            onClick={()=>setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full ${
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
          initial={{x:20,opacity:0}}
          animate={{x:0,opacity:1}}
          exit={{x:-20,opacity:0}}
          transition={{duration:0.2}}
          className="surface-card p-8 w-full max-w-[760px]"
        >

          <StageExplorationFlow
            stageTitle={stage?.title || "Module"}
            startup={startup}
          />
          {/* Navigation */}

          <div className="flex items-center justify-between mt-6 pt-4 border-t">

            <Button
              variant="ghost"
              onClick={()=>setCurrentSlide(Math.max(0,currentSlide-1))}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1"/>
              Previous
            </Button>

            <div className="flex gap-2">

              {!feedback[currentSlide] && (

                <Button
                  onClick={handleContinue}
                  disabled={!answers[currentSlide]?.trim() || loading}
                >

                  {loading && (
                    <Loader2 className="h-4 w-4 animate-spin mr-1"/>
                  )}

                  Continue

                </Button>

              )}

              {feedback[currentSlide] &&
                currentSlide < slides.length - 1 && (

                <Button
                  onClick={()=>setCurrentSlide(currentSlide+1)}
                >

                  Next
                  <ChevronRight className="h-4 w-4 ml-1"/>

                </Button>

              )}

            </div>

          </div>

        </motion.div>

      </AnimatePresence>

      {/* Counter */}

      <p className="text-xs text-muted-foreground mt-6 font-mono-tabular">
        {currentSlide + 1} / {slides.length}
      </p>

    </div>
  )
}