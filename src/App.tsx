
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { LanguageProvider } from "@/i18n/language-provider";
import { SidebarProvider } from "@/components/layouts/sidebar-provider";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Dashboard from "@/pages/dashboard";
import Clients from "@/pages/clients";
import Users from "@/pages/users";
import Products from "@/pages/products";
import Categories from "@/pages/categories";
import Profile from "@/pages/profile";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/login";
import Registro from "@/pages/registro";
import ErrorBoundary from "@/components/error-boundary";

// Create a new QueryClient instance with improved configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <LanguageProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/" element={
                  <SidebarProvider>
                    <DashboardLayout />
                  </SidebarProvider>
                }>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="users" element={<Users />} />
                  <Route path="products" element={<Products />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
