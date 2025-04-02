
import { Product } from "@/services/products";
import { FormProvider } from "./form/FormProvider";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { ClientSelect } from "@/components/users/ClientSelect";
import { CategorySelect } from "@/components/categories/CategorySelect";
import { FormButtons } from "./form/FormButtons";

interface ProductFormProps {
  onProductCreated: () => Promise<void>;
  onCancel: () => void;
  initialProduct?: Product | null;
  isEditMode?: boolean;
}

export const ProductForm = ({ 
  onProductCreated, 
  onCancel,
  initialProduct = null,
  isEditMode = false
}: ProductFormProps) => {
  return (
    <FormProvider
      onProductCreated={onProductCreated}
      onCancel={onCancel}
      initialProduct={initialProduct}
      isEditMode={isEditMode}
    >
      {({ 
        newProduct, 
        isSubmitting, 
        handleInputChange, 
        handleClientChange, 
        handleCategoryChange, 
        handleSubmit 
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <BasicInfoFields
              name={newProduct.name}
              description={newProduct.description}
              createdBy={newProduct.created_by}
              onInputChange={handleInputChange}
            />
            
            <ClientSelect 
              value={newProduct.client_id} 
              onValueChange={handleClientChange}
            />
            
            <CategorySelect 
              value={newProduct.category_id}
              onValueChange={handleCategoryChange}
            />
          </div>
          
          <FormButtons
            isSubmitting={isSubmitting}
            onCancel={onCancel}
            isEditMode={isEditMode}
          />
        </form>
      )}
    </FormProvider>
  );
};
