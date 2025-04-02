
import { AlertTriangle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface ConnectionAlertProps {
  visible: boolean;
}

export const ConnectionAlert = ({ visible }: ConnectionAlertProps) => {
  if (!visible) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle>Error de conexión</AlertTitle>
      <AlertDescription>
        No se pudo conectar a Supabase. Verifique que su URL y clave de Supabase sean correctas en el archivo .env. 
        La URL debe tener el formato: https://tu-proyecto-id.supabase.co
        <br />
        <br />
        Si el error persiste, verifique que la tabla 'clients' existe en su proyecto de Supabase.
      </AlertDescription>
    </Alert>
  );
};
