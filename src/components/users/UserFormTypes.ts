
export type UserFormData = {
  name: string;
  email: string;
  client_id: string;
  status: 'active' | 'inactive';
  created_by: string;
};

export type UserFormProps = {
  onUserCreated: () => Promise<void>;
  onCancel: () => void;
};
