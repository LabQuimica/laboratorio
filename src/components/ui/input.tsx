import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {






    
    React.useEffect(() => {
      const restorePointerEvents = () => {
        if (document.body.style.pointerEvents === "none") {
          document.body.style.pointerEvents = "auto";
        }
      };
      restorePointerEvents();
      const observer = new MutationObserver(() => restorePointerEvents());
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["style"],
      });
  
      return () => {
        observer.disconnect();
        restorePointerEvents();
      };
    }, []);







    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full border border-input bg-transparent px-3 py-1 text-base shadow-xl transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
