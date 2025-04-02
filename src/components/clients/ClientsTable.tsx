
import { Client } from "@/services/clients";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/data-table";
import { Edit, Trash, Eye, MoreHorizontal, Users } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface ClientsTableProps {
  clients: Client[];
  isLoading: boolean;
  onAddNew: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export const ClientsTable = ({ 
  clients, 
  isLoading, 
  onAddNew,
  onEdit,
  onDelete,
  onView
}: ClientsTableProps) => {
  const { t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Handle menu item click with proper event handling
  const handleMenuItemClick = (
    e: React.MouseEvent, 
    clientId: string, 
    action: (id: string) => void | undefined
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(null);
    
    // Use setTimeout to avoid React state update conflicts
    setTimeout(() => {
      if (action) {
        action(clientId);
      }
    }, 50);
  };
  
  const columns: Column<Client>[] = [
    {
      header: t("clients.name"),
      accessorKey: "name",
      searchable: true,
    },
    {
      header: t("clients.email"),
      accessorKey: "email",
      searchable: true,
    },
    {
      header: t("clients.phone"),
      accessorKey: "phone",
      searchable: true,
    },
    {
      header: t("clients.status"),
      accessorKey: "status",
      searchable: true,
      cell: (client) => (
        <Badge variant={client.status === "active" ? "success" : "secondary"}>
          {client.status === "active" ? t("clients.active") : t("clients.inactive")}
        </Badge>
      ),
    },
    {
      header: t("clients.createdAt"),
      accessorKey: "created_at",
      searchable: false,
      cell: (client) => new Date(client.created_at).toLocaleDateString(),
    },
    {
      header: t("clients.actions"),
      accessorKey: "id",
      searchable: false,
      cell: (client) => (
        <DropdownMenu 
          open={activeDropdown === client.id}
          onOpenChange={(open) => {
            setActiveDropdown(open ? client.id : null);
          }}
        >
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal size={16} />
              <span className="sr-only">{t("clients.actions")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-50 w-48 bg-popover">
            <DropdownMenuLabel>{t("clients.actions")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {onView && (
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={(e) => handleMenuItemClick(e, client.id, onView)}
              >
                <Eye size={16} className="mr-2" /> {t("clients.view")}
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={(e) => handleMenuItemClick(e, client.id, onEdit)}
              >
                <Edit size={16} className="mr-2" /> {t("clients.edit")}
              </DropdownMenuItem>
            )}
            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive cursor-pointer"
                  onClick={(e) => handleMenuItemClick(e, client.id, onDelete)}
                >
                  <Trash size={16} className="mr-2" /> {t("clients.delete")}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={clients}
      title={t("clients.title")}
      searchPlaceholder={t("clients.searchPlaceholder")}
      onAddNew={onAddNew}
      isLoading={isLoading}
      icon={Users}
      addButtonText={t("clients.addClient")}
    />
  );
};
