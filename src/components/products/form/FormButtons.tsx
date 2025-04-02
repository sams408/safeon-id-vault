
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Save, Edit } from "lucide-react";

interface FormButtonsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  isEditMode: boolean;
}

export const FormButtons = ({ isSubmitting, onCancel, isEditMode }: FormButtonsProps) => {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isEditMode ? (
          <>
            <Edit className="mr-2 h-4 w-4" /> Actualizar
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" /> Guardar
          </>
        )}
      </Button>
    </DialogFooter>
  );
};
