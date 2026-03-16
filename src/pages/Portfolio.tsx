import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"

import { useStartups } from "@/hooks/useStartup"

import { motion, AnimatePresence } from "framer-motion"
import { ScoreBadge } from "@/components/ScoreBadge"
import { SectionCard } from "@/components/SectionCard"
import { Button } from "@/components/ui/button"

import { ExternalLink, Heart } from "lucide-react"
import { FloatingAIChat } from "@/components/FloatingAIChat"

import { useAIDigest } from "@/hooks/useAiDigest"
import { useCurrentStartup } from "@/hooks/useCurrentStartup"

const TABS = ["Overview","Market","Product","Business","Metrics","Score"] as const

const PortfolioPage = () => {

 const { id } = useParams()

const { startup: userStartup, loading: userLoading } = useCurrentStartup()
const { data: startups, isLoading: startupsLoading } = useStartups()


const startup =
  (id && startups?.find(s => s.id === id)) ||
  userStartup ||
  startups?.[0]


    const aboutDigest = useAIDigest(`
  Startup: ${startup.name}
  
  Descrição:
  ${startup.description}
  
  Problema:
  ${startup.problem}
  
  Solução:
  ${startup.solution}
  `)
  
    const marketDigest = useAIDigest(`
  Startup: ${startup.name}
  
  TAM ${startup.tam}
  SAM ${startup.sam}
  SOM ${startup.som}
  
  Competidores:
  ${startup.competitors?.join(",")}
  `)
  
    const productDigest = useAIDigest(`
  Startup: ${startup.name}
  
  Features:
  ${startup.features?.join(",")}
  `)

  const [activeTab,setActiveTab] =
    useState<(typeof TABS)[number]>("Overview")




  if(!startup){
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        Startup not found
      </div>
    )
  }

  return (

    <div className="max-w-[1440px] mx-auto px-10 py-8">

      {/* Header */}

      <div className="surface-card p-6 mb-6">

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <h1 className="text-display text-foreground">
              {startup.name}
            </h1>

            <ScoreBadge score={startup.score} size="lg" />

          </div>

          <div className="flex gap-2">

            <Button
              variant="outline"
              onClick={()=>navigate(`/marketing/${startup.id}`)}
            >
              <ExternalLink className="h-4 w-4 mr-1"/>
              Marketing Page
            </Button>

            <Button variant="ghost">
              <Heart className="h-4 w-4 mr-1"/>
              Follow
            </Button>

          </div>

        </div>

        <p className="text-body text-muted-foreground mt-2">
          {startup.tagline}
        </p>

        <div className="flex gap-2 mt-3">

          <span className="text-xs font-medium bg-accent px-2.5 py-1 rounded-md">
            {startup.category}
          </span>

          <span className="text-xs font-medium bg-muted px-2.5 py-1 rounded-md">
            {startup.stage}
          </span>

        </div>

      </div>

      {/* Tabs */}

      <div className="border-b mb-6">

        <div className="flex">

          {TABS.map((tab)=>(
            <button
              key={tab}
              onClick={()=>setActiveTab(tab)}
              className={`relative px-5 py-3 text-sm font-medium ${
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
                  transition={{
                    type:"spring",
                    stiffness:300,
                    damping:30
                  }}
                />

              )}

            </button>
          ))}

        </div>

      </div>

      {/* Content */}

      <div className="max-w-[920px] mx-auto">

        <AnimatePresence mode="wait">

          <motion.div
            key={activeTab}
            initial={{opacity:0,x:10}}
            animate={{opacity:1,x:0}}
            exit={{opacity:0,x:-10}}
            transition={{duration:0.2}}
            className="space-y-4"
          >

            {activeTab === "Overview" && (
              <>
                <SectionCard
                  title="About"
                  defaultOpen
                  aiInsight={aboutDigest.digest}
                >
                  {startup.description}
                </SectionCard>

                <SectionCard title="Problem" defaultOpen>
                  {startup.problem}
                </SectionCard>

                <SectionCard title="Solution" defaultOpen>
                  {startup.solution}
                </SectionCard>
              </>
            )}

            {activeTab === "Market" && (
              <>
                <SectionCard
                  title="TAM / SAM / SOM"
                  defaultOpen
                  aiInsight={marketDigest.digest}
                >

                  <div className="grid grid-cols-3 gap-4">

                    {[
                      {label:"TAM",value:startup.tam},
                      {label:"SAM",value:startup.sam},
                      {label:"SOM",value:startup.som}
                    ].map(m=>(
                      <div
                        key={m.label}
                        className="text-center p-4 bg-accent rounded-lg"
                      >
                        <p className="text-xs text-muted-foreground">
                          {m.label}
                        </p>
                        <p className="text-2xl font-bold">
                          {m.value}
                        </p>
                      </div>
                    ))}

                  </div>

                </SectionCard>

                <SectionCard title="Competitors">

                  <ul className="space-y-2">

                    {startup.competitors?.map(c=>(
                      <li key={c} className="text-sm">
                        • {c}
                      </li>
                    ))}

                  </ul>

                </SectionCard>

              </>
            )}

            {activeTab === "Product" && (

              <SectionCard
                title="Features"
                defaultOpen
                aiInsight={productDigest.digest}
              >

                <div className="grid grid-cols-2 gap-3">

                  {startup.features?.map(f=>(
                    <div
                      key={f}
                      className="p-3 bg-accent rounded-lg text-sm"
                    >
                      {f}
                    </div>
                  ))}

                </div>

              </SectionCard>

            )}

          </motion.div>

        </AnimatePresence>

      </div>

      <FloatingAIChat/>

    </div>
  )
}

export default PortfolioPage