
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("clients.actions")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onView && onView(client.id)}>
              <Eye size={16} className="mr-2" /> {t("clients.view")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit && onEdit(client.id)}>
              <Edit size={16} className="mr-2" /> {t("clients.edit")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => onDelete && onDelete(client.id)}
            >
              <Trash size={16} className="mr-2" /> {t("clients.delete")}
            </DropdownMenuItem>
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
