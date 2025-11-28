import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/PageLoader";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollToHash } from "@/components/ScrollToHash";

// Lazy load all pages for better initial load time
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Join = lazy(() => import("./pages/Join").then(m => ({ default: m.Join })));
const Onboarding = lazy(() => import("./pages/Onboarding").then(m => ({ default: m.Onboarding })));
const Dashboard = lazy(() => import("./pages/Dashboard").then(m => ({ default: m.Dashboard })));
const CampaignNew = lazy(() => import("./pages/CampaignNew").then(m => ({ default: m.CampaignNew })));
const Publishers = lazy(() => import("./pages/Publishers"));
const PublishersOverview = lazy(() => import("./pages/PublishersOverview").then(m => ({ default: m.PublishersOverview })));
const Advertisers = lazy(() => import("./pages/Advertisers"));
const Customers = lazy(() => import("./pages/Customers"));
const Demo = lazy(() => import("./pages/Demo").then(m => ({ default: m.Demo })));
const Login = lazy(() => import("./pages/Login").then(m => ({ default: m.Login })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToHash />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/join" element={<Join />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/campaign/new" element={<CampaignNew />} />
                <Route path="/publishers" element={<Publishers />} />
                <Route path="/publishers/overview" element={<PublishersOverview />} />
                <Route path="/advertisers" element={<Advertisers />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/login" element={<Login />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
