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
const PublishersOverview = lazy(() => import("./pages/PublishersOverview").then(m => ({ default: m.PublishersOverview })));
const Publishers = lazy(() => import("./pages/Publishers").then(m => ({ default: m.Publishers })));
const Advertisers = lazy(() => import("./pages/Advertisers").then(m => ({ default: m.Advertisers })));
const Demo = lazy(() => import("./pages/Demo").then(m => ({ default: m.Demo })));
const Login = lazy(() => import("./pages/Login").then(m => ({ default: m.Login })));
const Docs = lazy(() => import("./pages/Docs"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Careers = lazy(() => import("./pages/Careers"));
const FullStackEngineer = lazy(() => import("./pages/careers/FullStackEngineer"));
const MLEngineer = lazy(() => import("./pages/careers/MLEngineer"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Help = lazy(() => import("./pages/Help"));

// Help subpages
const HelpGettingStarted = lazy(() => import("./pages/help/GettingStarted"));
const HelpPublishers = lazy(() => import("./pages/help/HelpPublishers"));
const HelpAdvertisers = lazy(() => import("./pages/help/HelpAdvertisers"));
const HelpSDK = lazy(() => import("./pages/help/HelpSDK"));
const HelpFAQ = lazy(() => import("./pages/help/HelpFAQ"));

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
                <Route path="/publishers/overview" element={<PublishersOverview />} />
                <Route path="/publishers" element={<Publishers />} />
                <Route path="/advertisers" element={<Advertisers />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/careers/full-stack-engineer" element={<FullStackEngineer />} />
                <Route path="/careers/ml-engineer" element={<MLEngineer />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<Help />} />
                <Route path="/help/getting-started" element={<HelpGettingStarted />} />
                <Route path="/help/publishers" element={<HelpPublishers />} />
                <Route path="/help/advertisers" element={<HelpAdvertisers />} />
                <Route path="/help/sdk" element={<HelpSDK />} />
                <Route path="/help/faq" element={<HelpFAQ />} />
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
