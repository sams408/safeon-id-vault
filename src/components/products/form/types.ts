
export type ProductFormData = {
  name: string;
  description: string;
  client_id: string;
  category_id: string;
  category: string;
  created_by: string;
};

export const defaultProductData: ProductFormData = {
  name: "",
  description: "",
  client_id: "",
  category_id: "default",
  category: "Default",
  created_by: "admin",
};
