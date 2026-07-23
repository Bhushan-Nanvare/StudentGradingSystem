import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorCardProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorCard({ message = "An error occurred while loading data.", onRetry }: ErrorCardProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 flex flex-col items-center justify-center text-center">
      <AlertTriangle className="h-10 w-10 text-red-500 mb-3" />
      <h3 className="text-lg font-semibold text-red-700">Something went wrong</h3>
      <p className="text-sm text-red-600 mt-1 max-w-md">{message}</p>
      
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="mt-4 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
