
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/hooks/use-toast";
import { fetchClients, Client } from "@/services/clients";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error("Error loading clients:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los clientes",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadClients();
  }, [toast]);

  const handleAddClient = () => {
    console.log("Add new client");
  };

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
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={clients}
        title="Clientes"
        searchPlaceholder="Buscar clientes..."
        onAddNew={handleAddClient}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Clients;
