
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientFormData } from "./ClientFormTypes";
import { StatusSelect } from "@/components/users/StatusSelect";

type ClientFormFieldsProps = {
  client: ClientFormData;
  onChange: (client: ClientFormData) => void;
};

export const ClientFormFields = ({ client, onChange }: ClientFormFieldsProps) => {
  // Create local state to manage form values
  const [formValues, setFormValues] = useState<ClientFormData>(client);

  // Update local state when props change
  useEffect(() => {
    setFormValues(client);
  }, [client]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
    onChange(updatedValues);
  };

  const handleStatusChange = (value: 'active' | 'inactive') => {
    const updatedValues = { ...formValues, status: value };
    setFormValues(updatedValues);
    onChange(updatedValues);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre
        </Label>
        <Input
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
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
          value={formValues.email}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Teléfono
        </Label>
        <Input
          id="phone"
          name="phone"
          value={formValues.phone}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <StatusSelect 
        value={formValues.status} 
        onValueChange={handleStatusChange}
      />
    </div>
  );
};
