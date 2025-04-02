
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type StatusSelectProps = {
  value: 'active' | 'inactive';
  onValueChange: (value: 'active' | 'inactive') => void;
};

export const StatusSelect = ({ value, onValueChange }: StatusSelectProps) => {
  const handleChange = (value: string) => {
    if (value === 'active' || value === 'inactive') {
      onValueChange(value);
    }
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="status" className="text-right">
        Estado
      </Label>
      <Select 
        value={value} 
        onValueChange={handleChange}
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
  );
};
