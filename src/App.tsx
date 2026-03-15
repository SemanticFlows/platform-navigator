import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Discover from "./pages/Discover";
import Portfolio from "./pages/Portfolio";
import MarketingPage from "./pages/MarketingPage";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
