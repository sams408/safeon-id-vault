
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoFieldsProps {
  name: string;
  description: string;
  createdBy: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const BasicInfoFields = ({ 
  name, 
  description, 
  createdBy, 
  onInputChange 
}: BasicInfoFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre
        </Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={onInputChange}
          className="col-span-3"
          required
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Descripción
        </Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={onInputChange}
          className="col-span-3"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="created_by" className="text-right">
          Creado por
        </Label>
        <Input
          id="created_by"
          name="created_by"
          value={createdBy}
          onChange={onInputChange}
          className="col-span-3"
          required
        />
      </div>
    </>
  );
};
