
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchClients, Client } from "@/services/clients";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type ClientSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

export const ClientSelect = ({ value, onValueChange, disabled = false }: ClientSelectProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadClients = async () => {
      try {
        setIsLoading(true);
        const clientData = await fetchClients();
        setClients(clientData);
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

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="client" className="text-right">
        Cliente
      </Label>
      <Select 
        value={value} 
        onValueChange={onValueChange}
        disabled={disabled || isLoading}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder="Seleccione un cliente" />
        </SelectTrigger>
        <SelectContent>
          {clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
