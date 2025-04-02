
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Tags, 
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Settings,
  LogOut,
  Shield
} from "lucide-react";
import { useSidebar } from "@/components/layouts/sidebar-provider";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
  expanded: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, active, expanded }: SidebarItemProps) => {
  return (
    <Link 
      to={path}
      className={cn(
        "flex items-center py-3 px-4 rounded-lg transition-colors",
        expanded ? "mx-3" : "mx-2 justify-center",
        active 
          ? "bg-safeon-100 text-safeon-700 font-medium" 
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <Icon size={20} className={expanded ? "mr-3" : ""} />
      {expanded && <span>{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const { expanded, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const mainLinks = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Clientes", path: "/clients" },
    { icon: Users, label: "Usuarios", path: "/users" },
    { icon: ShoppingBag, label: "Productos", path: "/products" },
    { icon: Tags, label: "Categorías", path: "/categories" },
  ];

  const otherLinks = [
    { icon: BarChart3, label: "Reportes", path: "/reports" },
    { icon: Shield, label: "Seguridad", path: "/security" },
    { icon: Settings, label: "Configuración", path: "/settings" },
  ];

  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 h-screen flex flex-col fixed z-10 top-0 left-0 transition-all duration-300",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className={cn(
        "flex items-center h-16 border-b border-gray-200 px-4",
        expanded ? "justify-between" : "justify-center"
      )}>
        {expanded ? (
          <>
            <div className="flex items-center">
              <div className="bg-safeon-500 text-white rounded-md h-8 w-8 flex items-center justify-center mr-2">
                <Shield size={18} />
              </div>
              <span className="font-semibold text-lg">SafeOn</span>
            </div>
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
          </>
        ) : (
          <>
            <div className="bg-safeon-500 text-white rounded-md h-8 w-8 flex items-center justify-center">
              <Shield size={18} />
            </div>
            <button 
              onClick={toggleSidebar}
              className="absolute -right-3 top-7 bg-white rounded-full border border-gray-200 shadow-sm p-1"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1">
          {mainLinks.map((link) => (
            <SidebarItem 
              key={link.path}
              icon={link.icon}
              label={link.label}
              path={link.path}
              active={
                link.path === "/" 
                  ? currentPath === "/" 
                  : currentPath.startsWith(link.path)
              }
              expanded={expanded}
            />
          ))}
        </div>

        <div className="mt-6">
          {expanded && <p className="text-xs font-medium text-gray-400 px-7 mb-2">SISTEMA</p>}
          <div className="space-y-1">
            {otherLinks.map((link) => (
              <SidebarItem 
                key={link.path}
                icon={link.icon}
                label={link.label}
                path={link.path}
                active={currentPath === link.path}
                expanded={expanded}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={cn(
        "border-t border-gray-200 p-4",
        expanded ? "" : "flex justify-center"
      )}>
        <button className={cn(
          "flex items-center text-gray-600 hover:text-gray-900 transition-colors",
          expanded ? "" : "justify-center"
        )}>
          <LogOut size={20} className={expanded ? "mr-3" : ""} />
          {expanded && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
