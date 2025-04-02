
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/data-table";
import { Edit, Trash, Eye, MoreHorizontal, Shield, User } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { fetchUsers, deleteUser, User as UserType } from "@/services/users";
import { UserForm } from "@/components/users/UserForm";

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAddUser = () => {
    setSelectedUserId(null);
    setIsDialogOpen(true);
    console.log("Add new user");
  };

  const handleViewDetails = (id: string) => {
    console.log("View user details:", id);
    toast({
      title: "Ver detalles",
      description: `Acción para ver detalles del usuario ${id}`,
    });
  };

  const handleEdit = (id: string) => {
    console.log("Edit user:", id);
    setSelectedUserId(id);
    setIsDialogOpen(true);
  };

  const handlePermissions = (id: string) => {
    console.log("Manage permissions for user:", id);
    toast({
      title: "Gestionar permisos",
      description: `Acción para gestionar permisos del usuario ${id}`,
    });
  };

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUserId) return;
    
    try {
      setIsDeleting(true);
      await deleteUser(selectedUserId);
      toast({
        title: "Éxito",
        description: "Usuario eliminado correctamente",
      });
      await loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el usuario",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedUserId(null);
      setIsDeleting(false);
    }
  };

  const columns: Column<UserType>[] = [
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>
              <Eye size={16} className="mr-2" /> Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(user.id)}>
              <Edit size={16} className="mr-2" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePermissions(user.id)}>
              <Shield size={16} className="mr-2" /> Permisos
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => handleDeleteClick(user.id)}
            >
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
        isLoading={isLoading}
        icon={User}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <UserForm 
          onUserCreated={loadUsers}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="bg-card p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Confirmar eliminación</h2>
            <p className="mb-6">
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isDeleting}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Users;
