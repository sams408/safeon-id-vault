
import { useSidebar } from "@/components/layouts/sidebar-provider";
import { Search, Bell, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { expanded } = useSidebar();

  return (
    <header className={`h-16 px-6 border-b border-gray-200 bg-white flex items-center justify-between transition-all duration-300 ${expanded ? 'ml-64' : 'ml-20'}`}>
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Compañía</h1>
        <p className="text-sm text-gray-500">Bienvenido, Admin User. Este es el resumen de tu plataforma SafeOn.</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="search" 
            placeholder="Buscar..." 
            className="pl-10 w-64 bg-gray-50 border-gray-200"
          />
        </div>
        
        <Button size="icon" variant="ghost" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="flex items-center gap-2">
          <UserCircle size={32} className="text-gray-700" />
        </div>
      </div>
    </header>
  );
};

export default Header;
