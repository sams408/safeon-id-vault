
import { useSidebar } from "@/components/layouts/sidebar-provider";
import { Search, Bell, UserCircle, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const { expanded, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <header className={`h-16 px-3 sm:px-4 md:px-6 border-b border-gray-200 bg-white flex items-center justify-between transition-all duration-300 ${isMobile ? '' : (expanded ? 'ml-64' : 'ml-20')}`}>
      <div className="flex items-center">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="mr-2"
          >
            <Menu size={20} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Compañía</h1>
          <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Bienvenido, Admin User. Este es el resumen de tu plataforma SafeOn.</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="search" 
            placeholder="Buscar..." 
            className="pl-10 w-40 lg:w-64 bg-gray-50 border-gray-200"
          />
        </div>
        
        <Button size="icon" variant="ghost" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="flex items-center">
          <UserCircle size={32} className="text-gray-700" />
        </div>
      </div>
    </header>
  );
};

export default Header;
