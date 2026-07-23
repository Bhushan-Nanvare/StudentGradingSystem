import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  title = "No data found", 
  description = "There is currently no data available to display in this view.",
  icon
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50">
      <div className="rounded-full bg-slate-100 p-4 mb-4">
        {icon || <FolderOpen className="h-8 w-8 text-slate-400" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-md">{description}</p>
    </div>
  );
}
