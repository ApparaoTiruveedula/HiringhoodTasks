
import React from "react";
import { cn } from "@/lib/utils";

type ButtonType = "number" | "operation" | "action" | "equals";

interface CalcButtonProps {
  value: string;
  onClick: (value: string) => void;
  type?: ButtonType;
  className?: string;
  wide?: boolean;
}

const CalcButton = ({ 
  value, 
  onClick, 
  type = "number",
  className,
  wide = false
}: CalcButtonProps) => {
  // Determine button color based on type
  const getButtonClass = () => {
    switch (type) {
      case "number":
        return "bg-calculator-button-number hover:bg-calculator-button-number-hover text-white";
      case "operation":
        return "bg-calculator-button-operation hover:bg-calculator-button-operation-hover text-white";
      case "action":
        return "bg-calculator-button-action hover:bg-calculator-button-action-hover text-white";
      case "equals":
        return "bg-calculator-button-equals hover:bg-calculator-button-equals-hover text-white";
      default:
        return "bg-calculator-button-number";
    }
  };

  return (
    <button
      className={cn(
        "rounded-xl flex items-center justify-center text-xl font-semibold shadow-md transition-all",
        "active:animate-button-press backdrop-blur-sm text-white p-3 h-14",
        "hover:scale-105 hover:shadow-lg",
        getButtonClass(),
        wide ? "col-span-2" : "col-span-1",
        className
      )}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default CalcButton;
