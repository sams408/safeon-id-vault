
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/language-provider"; 
import { 
  fetchClients, 
  Client, 
  deleteClient 
} from "@/services/clients";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { ClientFormDialog } from "@/components/clients/ClientFormDialog";
import { ClientViewDialog } from "@/components/clients/ClientViewDialog";
import { ClientDeleteDialog } from "@/components/clients/ClientDeleteDialog";
import { ConnectionAlert } from "@/components/clients/ConnectionAlert";

export function ClientsPageContent() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    loadClients();
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
        title: t("clients.errorTitle"),
        description: t("clients.errorLoadingClients"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedClient(null);
    setIsEditing(false);
    setIsFormDialogOpen(true);
  };

  const handleView = (id: string) => {
    const client = clients.find((c) => c.id === id);
    if (client) {
      setSelectedClient(client);
      setIsViewDialogOpen(true);
    }
  };

  const handleEdit = (id: string) => {
    const client = clients.find((c) => c.id === id);
    if (client) {
      setSelectedClient(client);
      setIsEditing(true);
      setIsFormDialogOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const client = clients.find((c) => c.id === id);
    if (client) {
      setSelectedClient(client);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!selectedClient) return;
    
    try {
      await deleteClient(selectedClient.id);
      
      toast({
        title: t("clients.clientDeleted"),
        description: t("clients.clientDeletedDescription"),
      });
      
      await loadClients();
    } catch (error) {
      toast({
        title: t("clients.errorTitle"),
        description: t("clients.errorDeletingClient"),
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleClientSaved = async () => {
    await loadClients();
    setIsFormDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <ConnectionAlert visible={connectionError} />
      
      <ClientsTable 
        clients={clients} 
        isLoading={isLoading} 
        onAddNew={handleAddNew}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Dialog */}
      <ClientFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onClientCreated={handleClientSaved}
        initialClient={selectedClient}
        isEditMode={isEditing}
      />

      {/* View Dialog */}
      <ClientViewDialog
        client={selectedClient}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
      <ClientDeleteDialog
        client={selectedClient}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
