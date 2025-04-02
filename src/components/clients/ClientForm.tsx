
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createClient, updateClient, Client } from "@/services/clients";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { ClientFormFields } from "./ClientFormFields";
import { ClientFormActions } from "./ClientFormActions";
import { ClientFormData, ClientFormProps } from "./ClientFormTypes";

export const ClientForm = ({ 
  onClientCreated, 
  onCancel, 
  initialClient = null, 
  isEditMode = false 
}: ClientFormProps) => {
  const [newClient, setNewClient] = useState<ClientFormData>({
    name: initialClient?.name || "",
    email: initialClient?.email || "",
    phone: initialClient?.phone || "",
    status: initialClient?.status || "active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleClientChange = (updatedClient: ClientFormData) => {
    setNewClient(updatedClient);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!newClient.name || !newClient.email || !newClient.phone) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (isEditMode && initialClient) {
        console.log("Actualizando cliente:", initialClient.id, newClient);
        await updateClient(initialClient.id, newClient);
        toast({
          title: "Éxito",
          description: "Cliente actualizado correctamente",
        });
      } else {
        console.log("Creando cliente con datos:", newClient);
        await createClient(newClient);
        toast({
          title: "Éxito",
          description: "Cliente creado correctamente",
        });
      }
      
      // Reload the client list to show the updated clients
      await onClientCreated();
    } catch (error) {
      console.error("Error saving client:", error);
      toast({
        title: "Error",
        description: `No se pudo ${isEditMode ? 'actualizar' : 'crear'} el cliente. Verifique su conexión a Supabase.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Editar cliente' : 'Crear nuevo cliente'}</DialogTitle>
        <DialogDescription>
          Complete el formulario para {isEditMode ? 'actualizar el' : 'crear un nuevo'} cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <ClientFormFields 
          client={newClient} 
          onChange={handleClientChange} 
        />
        <ClientFormActions 
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
          onCancel={onCancel}
        />
      </form>
    </>
  );
};
