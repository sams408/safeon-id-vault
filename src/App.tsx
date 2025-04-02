
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SidebarProvider } from "@/components/layouts/sidebar-provider";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Dashboard from "@/pages/dashboard";
import Clients from "@/pages/clients";
import Users from "@/pages/users";
import Products from "@/pages/products";
import Categories from "@/pages/categories";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/login";
import Registro from "@/pages/registro";

// Create a new QueryClient instance for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Fixed App component as a function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/" element={
              <SidebarProvider>
                <DashboardLayout />
              </SidebarProvider>
            }>
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<Clients />} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
