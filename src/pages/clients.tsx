
import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { fetchClients, Client } from "@/services/clients";
import { supabase } from "@/integrations/supabase/client";

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

  const testSupabaseConnection = async () => {
    try {
      // First try a simple query to test the connection
      // Use a count query without specifying columns to avoid type errors
      const { error: clientsError } = await supabase
        .from('clients')
        .select('*', { head: true });
      
      if (clientsError) {
        console.error('Clients table connection failed:', clientsError);
        return false;
      }
      
      // Try to call the get_client_count function if it exists
      try {
        const { error: rpcError } = await supabase.rpc('get_client_count');
        if (rpcError) {
          console.error('RPC function call failed (expected if not created yet):', rpcError);
          // Continue even if this fails
        }
      } catch (rpcException) {
        console.error('RPC exception (non-critical):', rpcException);
        // Continue even if this fails
      }
      
      console.log('Supabase connection successful');
      return true;
    } catch (error) {
      console.error('Supabase connection failed:', error);
      return false;
    }
  };

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
