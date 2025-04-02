
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layouts/sidebar";
import Header from "@/components/layouts/header";
import { useSidebar } from "@/components/layouts/sidebar-provider";

const DashboardLayout = () => {
  const { expanded } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className={`transition-all duration-300 ${expanded ? 'ml-64' : 'ml-20'}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
