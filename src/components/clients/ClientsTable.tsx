
import { Client } from "@/services/clients";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/data-table";
import { Edit, Trash, Eye, MoreHorizontal } from "lucide-react";
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
}

export const ClientsTable = ({ clients, isLoading, onAddNew }: ClientsTableProps) => {
  const columns: Column<Client>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Teléfono",
      accessorKey: "phone",
    },
    {
      header: "Estado",
      accessorKey: "status",
      cell: (client) => (
        <Badge variant={client.status === "active" ? "success" : "secondary"}>
          {client.status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      header: "Fecha de creación",
      accessorKey: "created_at",
      cell: (client) => new Date(client.created_at).toLocaleDateString(),
    },
    {
      header: "Acciones",
      accessorKey: "id",
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
            <DropdownMenuItem>
              <Eye size={16} className="mr-2" /> Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit size={16} className="mr-2" /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
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
    />
  );
};
