import { Database } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ElementType;
  title?: string;
  message?: string;
  fullScreen?: boolean;
}

export function EmptyState({
  icon: Icon = Database,
  title = "No data available",
  message = "Please check your connection or try again later.",
  fullScreen = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        fullScreen ? "h-[70vh]" : "py-6"
      }`}
    >
      <Icon className="h-10 w-10 text-muted-foreground mb-3" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{message}</p>
    </div>
  );
}
