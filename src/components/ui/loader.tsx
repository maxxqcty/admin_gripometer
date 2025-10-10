import { Loader2 } from "lucide-react";

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export function Loader({ text = "Loading...", fullScreen = false }: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "h-[70vh]" : "py-6"
      }`}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
