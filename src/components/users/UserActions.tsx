
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Shield, Trash } from "lucide-react";

interface UserActionsProps {
  userId: string;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onPermissions: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UserActions = ({
  userId,
  onViewDetails,
  onEdit,
  onPermissions,
  onDelete,
}: UserActionsProps) => {
  // Crear funciones separadas para manejar cada acción y evitar cierres inesperados
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetails(userId);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(userId);
  };

  const handlePermissions = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPermissions(userId);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(userId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleViewDetails}>
          <Eye size={16} className="mr-2" /> Ver detalles
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>
          <Edit size={16} className="mr-2" /> Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePermissions}>
          <Shield size={16} className="mr-2" /> Permisos
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-destructive"
          onClick={handleDelete}
        >
          <Trash size={16} className="mr-2" /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
