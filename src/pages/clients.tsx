
import { useState } from "react";
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

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  created_at: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Empresa ABC",
    email: "contacto@empresaabc.com",
    phone: "+57 300 123 4567",
    status: "active",
    created_at: "2023-05-15",
  },
  {
    id: "2",
    name: "Corporación XYZ",
    email: "info@corporacionxyz.com",
    phone: "+52 55 1234 5678",
    status: "active",
    created_at: "2023-06-22",
  },
  {
    id: "3",
    name: "Industrias 123",
    email: "ventas@industrias123.com",
    phone: "+57 318 987 6543",
    status: "inactive",
    created_at: "2023-03-10",
  },
  {
    id: "4",
    name: "Grupo Tecnológico",
    email: "soporte@grupotec.com",
    phone: "+52 55 9876 5432",
    status: "active",
    created_at: "2023-07-05",
  },
  {
    id: "5",
    name: "Servicios Integrales",
    email: "contacto@serviciosintegrales.com",
    phone: "+57 320 456 7890",
    status: "active",
    created_at: "2023-04-18",
  },
];

const Clients = () => {
  const [clients] = useState<Client[]>(mockClients);

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
      />
    </div>
  );
};

export default Clients;
