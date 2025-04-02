
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  }

  private handleReload = () => {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-50 rounded-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Algo salió mal</h2>
          <p className="text-gray-600 mb-4 text-center max-w-md">
            Ocurrió un error al cargar esta sección. Puedes intentar recargar la página.
          </p>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={this.handleReset}
              className="flex items-center gap-2"
            >
              Intentar nuevamente
            </Button>
            <Button
              onClick={this.handleReload}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} /> Recargar página
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
