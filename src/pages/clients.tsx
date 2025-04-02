
import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { fetchClients, Client } from "@/services/clients";
import { testSupabaseConnection } from "@/lib/supabase";

// Import our new components
import { ClientsTable } from "@/components/clients/ClientsTable";
import { ClientForm } from "@/components/clients/ClientForm";
import { ConnectionAlert } from "@/components/clients/ConnectionAlert";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadClients();
    // Test Supabase connection on component mount
    testSupabaseConnection().then(isConnected => {
      setConnectionError(!isConnected);
    });
  }, []);

  const loadClients = async () => {
    try {
      setIsLoading(true);
      const data = await fetchClients();
      setClients(data);
      setConnectionError(false);
    } catch (error) {
      console.error("Error loading clients:", error);
      setConnectionError(true);
      toast({
        title: "Error",
        description: "No se pudieron cargar los clientes. Verifique su conexión a Supabase.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClient = () => {
    setIsDialogOpen(true);
    console.log("Add new client");
  };

  return (
    <div className="space-y-6">
      <ConnectionAlert visible={connectionError} />
      
      <ClientsTable 
        clients={clients}
        isLoading={isLoading}
        onAddNew={handleAddClient}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ClientForm 
          onClientCreated={loadClients}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default Clients;
