
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "@/components/layouts/sidebar";
import Header from "@/components/layouts/header";
import { useSidebar } from "@/components/layouts/sidebar-provider";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout = () => {
  const { expanded, setUserInfo } = useSidebar();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      // If no user is found, redirect to login
      navigate("/login");
    } else {
      try {
        const userData = JSON.parse(storedUser);
        setUserInfo(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    }
  }, [navigate, setUserInfo]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
          <div className={`transition-all duration-300 ${isMobile ? '' : (expanded ? 'ml-64' : 'ml-20')}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
