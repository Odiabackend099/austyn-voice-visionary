import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardCourses = lazy(() => import("./pages/DashboardCourses"));
const DashboardProgress = lazy(() => import("./pages/DashboardProgress"));
const DashboardPayments = lazy(() => import("./pages/DashboardPayments"));
const DashboardSettings = lazy(() => import("./pages/DashboardSettings"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <a href="#main-content" className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 px-3 py-2 rounded-md bg-background text-foreground border border-border shadow">Skip to content</a>
          <Suspense fallback={<div className="p-6 text-center text-muted-foreground">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/courses" element={<DashboardCourses />} />
              <Route path="/dashboard/progress" element={<DashboardProgress />} />
              <Route path="/dashboard/payments" element={<DashboardPayments />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
