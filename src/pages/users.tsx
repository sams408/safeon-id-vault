
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchUsers, User as UserType } from "@/services/users";
import { Dialog } from "@/components/ui/dialog";
import { UserForm } from "@/components/users/UserForm";
import { UsersList } from "@/components/users/UsersList";
import { UserDeleteDialog } from "@/components/users/UserDeleteDialog";

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
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
    console.log("Delete user:", id);
    setSelectedUserId(id);
    // Use setTimeout to ensure this runs outside of the current event cycle
    setTimeout(() => {
      setIsDeleteDialogOpen(true);
    }, 50);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    // Esperar un momento antes de limpiar el ID del usuario seleccionado
    // Esto evita problemas de renderizado durante la animación de cierre
    setTimeout(() => {
      setSelectedUserId(null);
    }, 300);
  };
  
  const handleCloseFormDialog = () => {
    setIsDialogOpen(false);
    // Clean up the selected user ID after dialog animation completes
    setTimeout(() => {
      setSelectedUserId(null);
    }, 300);
  };

  return (
    <div className="space-y-6">
      <UsersList
        users={users}
        isLoading={isLoading}
        onAddNew={handleAddUser}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onPermissions={handlePermissions}
        onDelete={handleDeleteClick}
      />

      <Dialog open={isDialogOpen} onOpenChange={handleCloseFormDialog}>
        <UserForm 
          onUserCreated={loadUsers}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Dialog>

      <Dialog 
        open={isDeleteDialogOpen && selectedUserId !== null} 
        onOpenChange={handleCloseDeleteDialog}
      >
        <UserDeleteDialog
          userId={selectedUserId}
          isOpen={isDeleteDialogOpen && selectedUserId !== null}
          onOpenChange={handleCloseDeleteDialog}
          onUserDeleted={loadUsers}
        />
      </Dialog>
    </div>
  );
};

export default Users;
