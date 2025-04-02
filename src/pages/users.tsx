
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/data-table";
import { Edit, Trash, Eye, MoreHorizontal, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  client_name: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  created_at: string;
  created_by: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    client_name: "Empresa ABC",
    name: "Juan Pérez",
    email: "jperez@empresaabc.com",
    status: "active",
    created_at: "2023-05-20",
    created_by: "Admin",
  },
  {
    id: "2",
    client_name: "Corporación XYZ",
    name: "María López",
    email: "mlopez@corporacionxyz.com",
    status: "active",
    created_at: "2023-06-25",
    created_by: "Admin",
  },
  {
    id: "3",
    client_name: "Industrias 123",
    name: "Carlos Rodríguez",
    email: "crodriguez@industrias123.com",
    status: "inactive",
    created_at: "2023-03-15",
    created_by: "Admin",
  },
  {
    id: "4",
    client_name: "Grupo Tecnológico",
    name: "Ana Gómez",
    email: "agomez@grupotec.com",
    status: "active",
    created_at: "2023-07-10",
    created_by: "Admin",
  },
  {
    id: "5",
    client_name: "Servicios Integrales",
    name: "Roberto Sánchez",
    email: "rsanchez@serviciosintegrales.com",
    status: "active",
    created_at: "2023-04-22",
    created_by: "Admin",
  },
];

const Users = () => {
  const [users] = useState<User[]>(mockUsers);

  const handleAddUser = () => {
    console.log("Add new user");
  };

  const columns: Column<User>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Cliente",
      accessorKey: "client_name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Estado",
      accessorKey: "status",
      cell: (user) => (
        <Badge variant={user.status === "active" ? "success" : "secondary"}>
          {user.status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      header: "Creado el",
      accessorKey: "created_at",
    },
    {
      header: "Creado por",
      accessorKey: "created_by",
    },
    {
      header: "Acciones",
      accessorKey: "id",
      cell: (user) => (
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
            <DropdownMenuItem>
              <Shield size={16} className="mr-2" /> Permisos
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
        data={users}
        title="Usuarios"
        searchPlaceholder="Buscar usuarios..."
        onAddNew={handleAddUser}
      />
    </div>
  );
};

export default Users;
