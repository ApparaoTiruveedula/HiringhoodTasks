import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import CalcButton from "./CalcButton";
import { Calculator as CalculatorIcon, History } from "lucide-react";

const Calculator = () => {
  const [display, setDisplay] = useState<string>("0");
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(false);
  const [calculationHistory, setCalculationHistory] = useState<string>("");
  const { toast } = useToast();

  // Handle digit input
  const handleDigit = (digit: string) => {
    // Only allow digits and decimal point
    if (!/^[0-9.]$/.test(digit)) {
      toast({
        title: "Invalid Input",
        description: "Only numbers are allowed",
        variant: "destructive",
      });
      return;
    }
    
    if (display === "0" || shouldResetDisplay) {
      setDisplay(digit);
      setCurrentValue(digit);
      setShouldResetDisplay(false);
    } else {
      // Don't allow multiple decimal points
      if (digit === "." && display.includes(".")) return;
      
      const newValue = display + digit;
      setDisplay(newValue);
      setCurrentValue(newValue);
    }
  };

  // Handle operations
  const handleOperation = (op: string) => {
    if (op === "=") {
      calculateResult();
      return;
    }

    if (op === "C") {
      clear();
      return;
    }

    if (op === "←") {
      handleBackspace();
      return;
    }

    if (op === "±") {
      handleToggleSign();
      return;
    }

    if (op === "√") {
      handleSquareRoot();
      return;
    }

    // Validate that current input is a valid number before proceeding with operation
    if (isNaN(parseFloat(currentValue))) {
      toast({
        title: "Invalid Input",
        description: "Only numbers are allowed",
        variant: "destructive",
      });
      return;
    }

    // For other operations, store the current value and set the operation
    if (previousValue && operation && !shouldResetDisplay) {
      // If we already have an operation in progress, calculate intermediate result
      calculateResult();
    }

    setPreviousValue(currentValue);
    setOperation(op);
    setShouldResetDisplay(true);
    
    // Update calculation history
    if (calculationHistory === "") {
      setCalculationHistory(`${currentValue} ${op}`);
    } else if (shouldResetDisplay) {
      setCalculationHistory(`${calculationHistory} ${op}`);
    } else {
      setCalculationHistory(`${calculationHistory} ${currentValue} ${op}`);
    }
  };

  // Calculate result based on stored operation
  const calculateResult = () => {
    if (!previousValue || !operation) return;
    
    try {
      // Validate inputs are valid numbers
      if (isNaN(parseFloat(previousValue)) || isNaN(parseFloat(currentValue))) {
        toast({
          title: "Invalid Input",
          description: "Only numbers are allowed",
          variant: "destructive",
        });
        clear();
        return;
      }
      
      // Convert to numbers for calculations
      const prev = parseFloat(previousValue);
      const current = parseFloat(currentValue);
      
      let result: number;
      
      switch (operation) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "×":
          result = prev * current;
          break;
        case "÷":
          if (current === 0) {
            throw new Error("Division by zero");
          }
          result = prev / current;
          break;
        case "%":
          result = prev % current;
          break;
        default:
          result = current;
      }
      
      // Check for NaN result
      if (isNaN(result)) {
        toast({
          title: "Error",
          description: "Operation resulted in an invalid number",
          variant: "destructive",
        });
        clear();
        return;
      }
      
      // Handle special case with very small numbers that are almost zero
      const formattedResult = Math.abs(result) < 1e-10 ? "0" : result.toString();
      
      // Update calculation history with the complete equation
      setCalculationHistory(`${previousValue} ${operation} ${currentValue} = ${formattedResult}`);
      
      setDisplay(formattedResult);
      setCurrentValue(formattedResult);
      setPreviousValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
    } catch (error) {
      if ((error as Error).message === "Division by zero") {
        toast({
          title: "Error",
          description: "Cannot divide by zero",
          variant: "destructive",
        });
        clear();
      } else {
        toast({
          title: "Error",
          description: "Invalid operation",
          variant: "destructive",
        });
        clear();
      }
    }
  };

  // Clear calculator
  const clear = () => {
    setDisplay("0");
    setCurrentValue("0");
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
    setCalculationHistory("");
  };

  // Handle backspace
  const handleBackspace = () => {
    if (display.length > 1) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      setCurrentValue(newDisplay);
    } else {
      setDisplay("0");
      setCurrentValue("0");
    }
  };

  // Handle toggle sign
  const handleToggleSign = () => {
    if (display === "0") return;
    
    // Validate that current input is a valid number
    if (isNaN(parseFloat(display))) {
      toast({
        title: "Invalid Input",
        description: "Only numbers are allowed",
        variant: "destructive",
      });
      return;
    }
    
    const newValue = parseFloat(display) * -1;
    setDisplay(newValue.toString());
    setCurrentValue(newValue.toString());
  };

  // Handle square root
  const handleSquareRoot = () => {
    // Validate that current input is a valid number
    if (isNaN(parseFloat(display))) {
      toast({
        title: "Invalid Input",
        description: "Only numbers are allowed",
        variant: "destructive",
      });
      return;
    }
    
    const num = parseFloat(display);
    
    if (num < 0) {
      toast({
        title: "Error",
        description: "Cannot calculate square root of a negative number",
        variant: "destructive",
      });
      return;
    }
    
    const result = Math.sqrt(num);
    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setShouldResetDisplay(true);
    
    // Update calculation history
    setCalculationHistory(`√(${num}) = ${result}`);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Directly validate key input for digits
      if (e.key >= "0" && e.key <= "9" || e.key === ".") {
        handleDigit(e.key);
      } else if (e.key === "+") {
        handleOperation("+");
      } else if (e.key === "-") {
        handleOperation("-");
      } else if (e.key === "*") {
        handleOperation("×");
      } else if (e.key === "/") {
        handleOperation("÷");
      } else if (e.key === "%") {
        handleOperation("%");
      } else if (e.key === "Enter" || e.key === "=") {
        handleOperation("=");
      } else if (e.key === "Escape") {
        handleOperation("C");
      } else if (e.key === "Backspace") {
        handleOperation("←");
      } else if (!/^[0-9+\-*\/%.=]$/.test(e.key) && e.key !== "Enter" && e.key !== "Escape" && e.key !== "Backspace") {
        // Show toast for any other keys that aren't valid calculator inputs
        toast({
          title: "Invalid Input",
          description: "Only numbers and operators are allowed",
          variant: "destructive",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentValue, previousValue, operation]);

  return (
    <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-calculator-gradient backdrop-blur-lg transform transition-all duration-300 hover:shadow-glow">
      {/* Calculator header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <h2 className="text-white font-bold flex items-center gap-2">
          <CalculatorIcon className="w-5 h-5" />
          Calculator
        </h2>
        <div className="flex items-center text-gray-300">
          <History className="w-4 h-4 mr-1" />
          <span className="text-xs">History</span>
        </div>
      </div>
      
      {/* Calculator display */}
      <div className="bg-calculator-display p-5 bg-opacity-70">
        {/* Calculation history display */}
        <div className="flex justify-end mb-3 overflow-hidden h-7">
          <p className="text-purple-200 text-lg font-medium tracking-wider truncate">
            {calculationHistory || "\u00A0"}
          </p>
        </div>
        
        {/* Current value display */}
        <div className="flex justify-end overflow-hidden h-16 mb-2">
          <p className="text-white text-4xl font-bold tracking-wider truncate">
            {display}
          </p>
        </div>
      </div>
      
      {/* Calculator keypad with improved spacing */}
      <div className="grid grid-cols-4 gap-3 p-5 bg-calculator-bg bg-opacity-80">
        {/* First row */}
        <CalcButton value="C" onClick={handleOperation} type="action" />
        <CalcButton value="±" onClick={handleOperation} type="action" />
        <CalcButton value="%" onClick={handleOperation} type="operation" />
        <CalcButton value="÷" onClick={handleOperation} type="operation" />
        
        {/* Second row */}
        <CalcButton value="7" onClick={handleDigit} />
        <CalcButton value="8" onClick={handleDigit} />
        <CalcButton value="9" onClick={handleDigit} />
        <CalcButton value="×" onClick={handleOperation} type="operation" />
        
        {/* Third row */}
        <CalcButton value="4" onClick={handleDigit} />
        <CalcButton value="5" onClick={handleDigit} />
        <CalcButton value="6" onClick={handleDigit} />
        <CalcButton value="-" onClick={handleOperation} type="operation" />
        
        {/* Fourth row */}
        <CalcButton value="1" onClick={handleDigit} />
        <CalcButton value="2" onClick={handleDigit} />
        <CalcButton value="3" onClick={handleDigit} />
        <CalcButton value="+" onClick={handleOperation} type="operation" />
        
        {/* Fifth row */}
        <CalcButton value="0" onClick={handleDigit} wide />
        <CalcButton value="." onClick={handleDigit} />
        <CalcButton value="=" onClick={handleOperation} type="equals" />

        {/* Sixth row */}
        <CalcButton value="←" onClick={handleOperation} type="action" className="col-span-2" wide />
        <CalcButton value="√" onClick={handleOperation} type="operation" className="col-span-2" wide />
      </div>
    </div>
  );
};

export default Calculator;
