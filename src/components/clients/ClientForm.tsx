
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createClient, updateClient, Client } from "@/services/clients";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type ClientFormData = {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
};

export type ClientFormProps = {
  onClientCreated: () => Promise<void>;
  onCancel: () => void;
  initialClient?: Client | null;
  isEditMode?: boolean;
};

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    // Only assign if the value is 'active' or 'inactive'
    if (value === 'active' || value === 'inactive') {
      setNewClient(prev => ({ ...prev, status: value }));
    }
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              value={newClient.name}
              onChange={handleInputChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={newClient.email}
              onChange={handleInputChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Teléfono
            </Label>
            <Input
              id="phone"
              name="phone"
              value={newClient.phone}
              onChange={handleInputChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Estado
            </Label>
            <Select 
              value={newClient.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccione un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isEditMode ? 'Actualizar' : 'Guardar'}
              </span>
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};
