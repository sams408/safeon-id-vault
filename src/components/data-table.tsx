
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, FilterX, Download, LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  searchable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title: string;
  searchPlaceholder?: string;
  onAddNew?: () => void;
  isLoading?: boolean;
  icon?: LucideIcon;
  addButtonIcon?: React.ReactNode;
  addButtonText?: string;
}

export function DataTable<T>({
  columns,
  data,
  title,
  searchPlaceholder = "Buscar...",
  onAddNew,
  isLoading = false,
  icon: Icon,
  addButtonIcon,
  addButtonText = "Nuevo",
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const { t } = useLanguage();

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(data);
      return;
    }

    const searchableColumns = columns.filter(column => column.searchable !== false);
    
    const filtered = data.filter(item => {
      return searchableColumns.some(column => {
        const value = item[column.accessorKey];
        if (value === null || value === undefined) return false;
        
        const stringValue = String(value).toLowerCase();
        return stringValue.includes(searchQuery.toLowerCase());
      });
    });

    setFilteredData(filtered);
  }, [searchQuery, data, columns]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold flex items-center">
          {Icon && <Icon className="mr-2 text-primary" size={24} />}
          {title}
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder={searchPlaceholder}
              className="pl-10 w-full sm:w-64"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={clearSearch} 
            disabled={!searchQuery}>
            <FilterX size={18} />
          </Button>
          <Button variant="outline" size="icon">
            <Download size={18} />
          </Button>
          {onAddNew && (
            <Button onClick={onAddNew}>
              {addButtonIcon || <PlusCircle className="mr-2" size={18} />}
              {addButtonText}
            </Button>
          )}
        </div>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center">
                  {t("common.loading")}
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center">
                  {searchQuery ? t("common.noResultsFound") : t("common.noDataAvailable")}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.cell ? column.cell(row) : row[column.accessorKey] as React.ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
