// src/components/ui/loading.tsx
import React from "react";

export function LoadingUI() {
  return (
      <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center p-6 bg-card text-card-foreground rounded-xl shadow-md">
        
        {/* Spinner that uses theme vars */}
        <div
          className="w-12 h-12 border-4 border-[var(--primary)] border-t-[var(--primary)] rounded-full animate-spin mb-3"
          role="status"
          aria-live="polite"
          aria-label="Loading content..."
        ></div>

        {/* Main text */}
        <p className="text-[var(--primary)] font-medium animate-pulse">
          Processing...
        </p>

        {/* Sub text */}
        <p className="text-sm text-[var(--muted-foreground)] mt-1 text-center">
          Please wait while the data loads.
        </p>
      </div>
    </div>
  );
}
