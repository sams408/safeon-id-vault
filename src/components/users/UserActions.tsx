
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onViewDetails(userId)}>
          <Eye size={16} className="mr-2" /> Ver detalles
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(userId)}>
          <Edit size={16} className="mr-2" /> Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPermissions(userId)}>
          <Shield size={16} className="mr-2" /> Permisos
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-destructive"
          onClick={() => onDelete(userId)}
        >
          <Trash size={16} className="mr-2" /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
