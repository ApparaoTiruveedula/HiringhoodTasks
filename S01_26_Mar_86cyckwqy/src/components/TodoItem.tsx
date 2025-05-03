
import { Todo } from "@/types/todo";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  console.log(todo)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="relative border-b border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(todo.id)}
            className="flex-shrink-0 w-6 h-6 rounded border border-primary flex items-center justify-center"
          >
            {todo.completed && (
              <div className="w-6 h-6 bg-primary flex items-center justify-center text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </button>
          <span
            className={cn(
              "transition-all duration-300 text-lg",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.completed ? <span className="text-gray-400">{todo.text}</span> : <span>{todo.text}</span>}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-gray-500 hover:text-primary transition-colors"
            aria-label="Edit todo"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-500 hover:text-destructive transition-colors"
            aria-label="Delete todo"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
