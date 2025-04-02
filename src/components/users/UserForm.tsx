
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createUser } from "@/services/users";

import { UserFormData, UserFormProps } from "./UserFormTypes";
import { UserFormFields } from "./UserFormFields";
import { UserFormActions } from "./UserFormActions";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const UserForm = ({ onUserCreated, onCancel }: UserFormProps) => {
  const [newUser, setNewUser] = useState<UserFormData>({
    name: "",
    email: "",
    client_id: "",
    status: "active",
    created_by: "admin", // Default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: 'active' | 'inactive') => {
    setNewUser(prev => ({ ...prev, status: value }));
  };

  const handleClientChange = (value: string) => {
    setNewUser(prev => ({ ...prev, client_id: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!newUser.name || !newUser.email || !newUser.client_id) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log("Sending user data to Supabase:", newUser);
      
      await createUser(newUser);
      
      // Show success notification
      toast({
        title: "Éxito",
        description: "Usuario creado correctamente",
      });
      
      // Reload the user list to show the new user
      await onUserCreated();
      onCancel();
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description: "No se pudo crear el usuario. Verifique su conexión a Supabase.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Crear nuevo usuario</DialogTitle>
        <DialogDescription>
          Complete el formulario para crear un nuevo usuario
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <UserFormFields 
          user={newUser}
          isLoadingClients={isLoadingClients}
          onInputChange={handleInputChange}
          onClientChange={handleClientChange}
          onStatusChange={handleStatusChange}
        />
        <UserFormActions 
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </DialogContent>
  );
};
