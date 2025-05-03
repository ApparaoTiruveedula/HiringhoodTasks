
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

interface TodoCheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export function TodoCheckbox({ checked, onChange, className }: TodoCheckboxProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "relative flex h-5 w-5 shrink-0 rounded-full border transition-all duration-200",
        checked 
          ? "border-primary bg-primary" 
          : "border-muted-foreground/50 bg-transparent",
        (isHovered && !checked) && "border-primary/50",
        className
      )}
      onClick={onChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {checked && (
        <Check 
          className="h-3 w-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground animate-todo-check" 
        />
      )}
    </div>
  );
}
