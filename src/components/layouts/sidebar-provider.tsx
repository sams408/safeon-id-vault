
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type UserInfo = {
  name: string;
  email: string;
  role: string;
};

type SidebarContextType = {
  expanded: boolean;
  toggleSidebar: () => void;
  openMobile: boolean;
  setOpenMobile: (value: boolean) => void;
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo) => void;
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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const isMobile = useIsMobile();
  
  // Load user info from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserInfo(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  
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
        setOpenMobile,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
