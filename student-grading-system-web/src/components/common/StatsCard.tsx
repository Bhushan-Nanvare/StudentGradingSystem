import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon: Icon, description, trend }: StatsCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        {Icon && (
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      
      <div>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        
        {(description || trend) && (
          <div className="mt-2 flex items-center text-sm">
            {trend && (
              <span className={`font-medium mr-2 ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
            )}
            {description && <span className="text-slate-500">{description}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
