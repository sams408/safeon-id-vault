
import { UserFormData } from "./UserFormTypes";
import { ClientSelect } from "./ClientSelect";
import { StatusSelect } from "./StatusSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserFormFieldsProps = {
  user: UserFormData;
  isLoadingClients: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClientChange: (value: string) => void;
  onStatusChange: (value: 'active' | 'inactive') => void;
};

export const UserFormFields = ({
  user,
  isLoadingClients,
  onInputChange,
  onClientChange,
  onStatusChange
}: UserFormFieldsProps) => {
  return (
    <div className="grid gap-4 py-4">
      <ClientSelect 
        value={user.client_id} 
        onValueChange={onClientChange}
        disabled={isLoadingClients}
      />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre
        </Label>
        <Input
          id="name"
          name="name"
          value={user.name}
          onChange={onInputChange}
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
          value={user.email}
          onChange={onInputChange}
          className="col-span-3"
          required
        />
      </div>
      <StatusSelect 
        value={user.status} 
        onValueChange={onStatusChange}
      />
    </div>
  );
};
