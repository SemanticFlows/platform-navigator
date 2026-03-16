import { initStartups } from "@/data/mockData"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

import { AppLayout } from "@/components/AppLayout"

import { auth } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"

import Discover from "./pages/Discover"
import Portfolio from "./pages/Portfolio"
import MarketingPage from "./pages/MarketingPage"
import Roadmap from "./pages/Roadmap"
import NotFound from "./pages/NotFound"
import Index from "./pages/Index"

const queryClient = new QueryClient()

const App = () => {

  const [user,setUser] = useState<User | null>(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    initStartups()

    const unsub = onAuthStateChanged(auth,(u)=>{
      setUser(u)
      setLoading(false)
    })

    return () => unsub()

  },[])

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        loading...
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>

          <div className="min-h-screen flex flex-col">

            <div className="flex-1">

              {!user ? (

                <Index/>

              ) : (

                <AppLayout>
                  <Routes>

                    <Route path="/" element={<Discover />} />

                    <Route path="/portfolio/:id" element={<Portfolio />} />
                    <Route path="/portfolio" element={<Portfolio />} />

                    <Route path="/marketing/:id" element={<MarketingPage />} />
                    <Route path="/marketing" element={<MarketingPage />} />

                    <Route path="/roadmap" element={<Roadmap />} />

                    <Route path="*" element={<NotFound />} />

                  </Routes>
                </AppLayout>

              )}

            </div>

            {/* Footer Global */}

            <footer className="text-center text-xs text-muted-foreground py-4 border-t bg-background">

              © {new Date().getFullYear()} IAgoraStartup — Hub de Startups  
              <span className="mx-2">•</span>
              Todos os direitos reservados

            </footer>

          </div>

        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App