
import { Client } from "@/services/clients";

export type ClientFormData = {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
};

export type ClientFormProps = {
  onClientCreated: () => Promise<void>;
  onCancel: () => void;
  initialClient?: Client | null;
  isEditMode?: boolean;
};
