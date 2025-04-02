
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarContextType = {
  expanded: boolean;
  toggleSidebar: () => void;
  openMobile: boolean;
  setOpenMobile: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [expanded, setExpanded] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = useIsMobile();
  
  // Auto collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setExpanded(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <SidebarContext.Provider 
      value={{ 
        expanded, 
        toggleSidebar, 
        openMobile, 
        setOpenMobile 
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
