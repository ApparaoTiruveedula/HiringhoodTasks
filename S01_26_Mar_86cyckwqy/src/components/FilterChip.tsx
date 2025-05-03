
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
  showDropdown?: boolean;
  onSelectFilter?: (filter: string) => void;
  isOpen?: boolean;
}

export function FilterChip({ 
  label, 
  active, 
  onClick, 
  className, 
  showDropdown = false,
  onSelectFilter,
  isOpen = false
}: FilterChipProps) {
  if (!showDropdown) {
    return (
      <button
        className={cn(
          "flex items-center gap-1 px-4 py-2 rounded-lg text-base font-medium transition-all",
          active 
            ? "bg-primary text-white" 
            : "bg-secondary hover:bg-secondary/80 text-primary",
          className
        )}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={onClick}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 px-4 py-2 rounded-lg text-base font-medium transition-all",
            active 
              ? "bg-primary text-white" 
              : "bg-secondary hover:bg-secondary/80 text-primary",
            className
          )}
        >
          {label}
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0 bg-white border rounded-lg shadow-lg">
        <div className="flex flex-col py-1">
          <button
            className="px-4 py-2 text-left hover:bg-indigo-50 text-indigo-600 font-medium"
            onClick={() => onSelectFilter && onSelectFilter("ALL")}
          >
            All
          </button>
          <button
            className="px-4 py-2 text-left hover:bg-indigo-50 text-indigo-600 font-medium"
            onClick={() => onSelectFilter && onSelectFilter("COMPLETED")}
          >
            Complete
          </button>
          <button
            className="px-4 py-2 text-left hover:bg-indigo-50 text-indigo-600 font-medium"
            onClick={() => onSelectFilter && onSelectFilter("ACTIVE")}
          >
            Incomplete
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
