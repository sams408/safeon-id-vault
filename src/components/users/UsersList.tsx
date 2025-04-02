
import { DataTable, Column } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon } from "lucide-react";
import { User } from "@/services/users";
import { UserActions } from "./UserActions";

interface UsersListProps {
  users: User[];
  isLoading: boolean;
  onAddNew: () => void;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onPermissions: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UsersList = ({
  users,
  isLoading,
  onAddNew,
  onViewDetails,
  onEdit,
  onPermissions,
  onDelete,
}: UsersListProps) => {
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
      cell: (user) => new Date(user.created_at).toLocaleDateString(),
    },
    {
      header: "Creado por",
      accessorKey: "created_by",
    },
    {
      header: "Acciones",
      accessorKey: "id",
      cell: (user) => (
        <UserActions
          userId={user.id}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onPermissions={onPermissions}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      title="Usuarios"
      searchPlaceholder="Buscar usuarios..."
      onAddNew={onAddNew}
      isLoading={isLoading}
      icon={UserIcon}
    />
  );
};
