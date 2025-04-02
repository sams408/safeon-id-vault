
import { Client } from "@/services/clients";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/data-table";
import { Edit, Trash, Eye, MoreHorizontal, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ClientsTableProps {
  clients: Client[];
  isLoading: boolean;
  onAddNew: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export const ClientsTable = ({ 
  clients, 
  isLoading, 
  onAddNew,
  onEdit,
  onDelete,
  onView
}: ClientsTableProps) => {
  const columns: Column<Client>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
      searchable: true,
    },
    {
      header: "Email",
      accessorKey: "email",
      searchable: true,
    },
    {
      header: "Teléfono",
      accessorKey: "phone",
      searchable: true,
    },
    {
      header: "Estado",
      accessorKey: "status",
      searchable: true,
      cell: (client) => (
        <Badge variant={client.status === "active" ? "success" : "secondary"}>
          {client.status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      header: "Fecha de creación",
      accessorKey: "created_at",
      searchable: false,
      cell: (client) => new Date(client.created_at).toLocaleDateString(),
    },
    {
      header: "Acciones",
      accessorKey: "id",
      searchable: false,
      cell: (client) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onView && onView(client.id)}>
              <Eye size={16} className="mr-2" /> Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit && onEdit(client.id)}>
              <Edit size={16} className="mr-2" /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => onDelete && onDelete(client.id)}
            >
              <Trash size={16} className="mr-2" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={clients}
      title="Clientes"
      searchPlaceholder="Buscar clientes..."
      onAddNew={onAddNew}
      isLoading={isLoading}
      icon={Users}
    />
  );
};
