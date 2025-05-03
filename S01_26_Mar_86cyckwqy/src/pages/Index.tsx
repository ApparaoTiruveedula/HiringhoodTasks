import { useState, useEffect } from "react";
import { Todo } from "@/types/todo";
import { TodoItem } from "@/components/TodoItem";
import { TodoDialog } from "@/components/TodoDialog";
import { EmptyState } from "@/components/EmptyState";
import { FilterChip } from "@/components/FilterChip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Toggle } from "@/components/ui/toggle";

type FilterType = "ALL" | "ACTIVE" | "COMPLETED";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        return JSON.parse(saved).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch (e) {
        console.error("Failed to parse todos from localStorage", e);
        return [];
      }
    }
    return [];
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddOrUpdateTodo = (text: string) => {
    if (editingTodo) {
      // Update existing todo
      const updatedTodos = todos.map(todo => 
        todo.id === editingTodo.id ? { ...todo, text } : todo
      );
      setTodos(updatedTodos);
      toast({
        description: "Note updated successfully",
      });
    } else {
      // Add new todo
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date()
      };
      setTodos([...todos, newTodo]);
      toast({
        description: "Note added successfully",
      });
    }
    setDialogOpen(false);
    setEditingTodo(null);
  };

  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    
    const todo = todos.find(t => t.id === id);
    if (todo) {
      toast({
        description: todo.completed 
          ? `Note marked as incomplete` 
          : `Note completed`,
      });
    }
  };

  const handleDeleteTodo = (id: number) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    
    if (todoToDelete) {
      toast({
        description: `Note deleted`,
        variant: "destructive",
      });
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setDialogOpen(true);
  };

  const handleFilterToggle = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const handleFilterSelect = (selectedFilter: string) => {
    setFilter(selectedFilter as FilterType);
    setFilterDropdownOpen(false);
    
    toast({
      description: `Showing ${selectedFilter.toLowerCase()} notes`,
    });
  };

  const filteredTodos = todos
    .filter(todo => {
      // Apply search filter
      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply status filter
      if (filter === "ACTIVE") return matchesSearch && !todo.completed;
      if (filter === "COMPLETED") return matchesSearch && todo.completed;
      return matchesSearch;
    })
    .sort((a, b) => {
      // Sort by completed status and then by creation date (newest first)
      if (a.completed === b.completed) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.completed ? 1 : -1;
    });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center transition-colors duration-300">
      {/* Header */}
      <div className="w-full max-w-md mx-auto pt-10 px-4">
        <h1 className="text-2xl font-bold tracking-tight text-center mb-8">TODO LIST</h1>
        
        {/* Search and Filters */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Search note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-3 h-12 border-gray-300 dark:border-gray-700 rounded-lg"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <FilterChip
            label="ALL"
            active={true}
            onClick={handleFilterToggle}
            showDropdown={true}
            onSelectFilter={handleFilterSelect}
            isOpen={filterDropdownOpen}
          />
          
          <Toggle
            pressed={theme === "dark"}
            onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-12 w-12 rounded-lg bg-blue dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </Toggle>
        </div>


        
        {/* Todo list */}
        {filteredTodos.length === 0 ? (
          <EmptyState searchTerm={searchTerm} filter={filter} />
        ) : (
          <div className="space-y-1 mb-24">
            <AnimatePresence>
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
        
      </div>

      {/* Add button */}
      <div className="fixed bottom-36 right-40">
        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => {
            setEditingTodo(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Todo dialog */}
      <TodoDialog
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingTodo(null);
        }}
        onSave={handleAddOrUpdateTodo}
        editingTodo={editingTodo}
      />
    </div>
  );
};

export default Index;
