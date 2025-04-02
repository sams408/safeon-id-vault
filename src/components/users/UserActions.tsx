
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
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  
  // Crear funciones separadas para manejar cada acción y evitar cierres inesperados
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setTimeout(() => onViewDetails(userId), 100);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setTimeout(() => onEdit(userId), 100);
  };

  const handlePermissions = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setTimeout(() => onPermissions(userId), 100);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setTimeout(() => onDelete(userId), 100);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild onClick={handleTriggerClick}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50">
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
