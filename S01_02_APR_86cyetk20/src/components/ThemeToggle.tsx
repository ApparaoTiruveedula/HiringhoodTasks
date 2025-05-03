
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setDarkMode, toggleDarkMode } from "@/store/themeSlice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize dark mode from local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialDarkMode = savedTheme 
      ? savedTheme === 'dark' 
      : systemPrefersDark;
    
    dispatch(setDarkMode(initialDarkMode));
  }, [dispatch]);
  
  // Apply dark mode class whenever darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
    toast({
      description: darkMode ? "Light mode enabled" : "Dark mode enabled",
      duration: 2000,
    });
  };

  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={handleToggle}
      className="rounded-full"
    >
      {darkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
