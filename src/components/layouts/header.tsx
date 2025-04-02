
import { useSidebar } from "@/components/layouts/sidebar-provider";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { expanded, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  // This would normally come from your auth context or state
  // For now using a placeholder, will be replaced with actual user data
  const userInfo = {
    name: "Admin User",
    email: "admin@safeon.com",
    role: "Administrador",
    initials: "AU"
  };

  const handleViewProfile = () => {
    setProfileOpen(false);
    setTimeout(() => navigate("/profile"), 100);
  };

  const handleSignOut = () => {
    setProfileOpen(false);
    setTimeout(() => navigate("/login"), 100);
  };

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
          <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Bienvenido, {userInfo.name}. Este es el resumen de tu plataforma SafeOn.</p>
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
        
        <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-safeon-600 text-white">
                  {userInfo.initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">{userInfo.name}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 z-50">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer">
              Ver perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
