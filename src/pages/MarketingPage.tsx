import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

import { useStartups } from "@/hooks/useStartup"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Eye, Pencil } from "lucide-react"
import { FloatingAIChat } from "@/components/FloatingAIChat"
import { useCurrentStartup } from "@/hooks/useCurrentStartup"

const ANCHORS = ["Overview", "Features", "Benefits", "FAQ", "Contact"]

const MarketingPage = () => {

const { id } = useParams()

const { data: startups, isLoading: startupsLoading } = useStartups()

const { startup: userStartup, loading: userLoading } = useCurrentStartup()

const navigate = useNavigate()

  const [mode, setMode] = useState<"preview" | "edit">("preview")


if (startupsLoading || userLoading) {
  return (
    <div className="flex justify-center py-20 text-muted-foreground">
      Loading startup...
    </div>
  )
}

const startup =
  (id && startups?.find(s => s.id === id)) ||
  userStartup ||
  startups?.[0]

if (!startup) {
  return (
    <div className="flex justify-center py-20 text-muted-foreground">
      No startup found
    </div>
  )
}




  if(!startup){
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        No startup found
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-10 py-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <h1 className="text-section-heading text-foreground">
          {startup.name} — Vitrine
        </h1>

        <div className="flex gap-1 bg-muted p-1 rounded-lg">

          <button
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === "preview"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>

          <button
            onClick={() => setMode("edit")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mode === "edit"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>

        </div>

      </div>

      {/* Anchors */}

      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b mb-8 -mx-10 px-10">
        <div className="flex gap-6 py-3 justify-center">
          {ANCHORS.map((anchor) => (
            <a
              key={anchor}
              href={`#${anchor.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {anchor}
            </a>
          ))}
        </div>
      </div>

      {mode === "preview" ? (

        <div className="space-y-16">

          {/* Overview */}

          <section id="overview" className="text-center py-16">

            <motion.h2
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-display text-foreground mb-4"
            >
              {startup.tagline}
            </motion.h2>

            <p className="text-body text-muted-foreground mx-auto max-w-2xl mb-8">
              {startup.description}
            </p>

            <div className="flex gap-3 justify-center">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>

          </section>

          {/* Features */}

          <section id="features">

            <h2 className="text-section-heading text-foreground mb-6 text-center">
              Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {startup.features?.map((f) => (

                <motion.div
                  key={f}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="surface-card p-6"
                >

                  <div className="w-3 h-3 rounded-full bg-primary mb-3" />

                  <h3 className="font-semibold text-foreground mb-1">
                    {f}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade {f.toLowerCase()} designed for modern teams.
                  </p>

                </motion.div>

              ))}

            </div>

          </section>

          {/* Benefits */}

          <section id="benefits" className="text-center">

            <h2 className="text-section-heading text-foreground mb-4">
              Why {startup.name}?
            </h2>

            <p className="text-body text-muted-foreground mx-auto">
              {startup.solution}
            </p>

          </section>

        </div>

      ) : (

        <div className="space-y-4">

          <div className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl p-6">
            <p className="text-label text-muted-foreground mb-2">
              Hero Title
            </p>

            <input
              defaultValue={startup.tagline}
              className="w-full text-xl font-bold bg-transparent border-b border-border pb-2 outline-none focus:border-primary text-foreground"
            />

          </div>

        </div>

      )}

      <FloatingAIChat />

    </div>
  )
}

export default MarketingPage