
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Todo } from "@/types/todo";

interface TodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  editingTodo: Todo | null;
}

export function TodoDialog({ isOpen, onClose, onSave, editingTodo }: TodoDialogProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
    } else {
      setText("");
    }
  }, [editingTodo, isOpen]);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text);
      setText("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 md:border rounded-lg bg-white dark:bg-[#1A1A1A] p-0 overflow-hidden">
        <DialogHeader className="px-4 pt-5 pb-0">
          <DialogTitle className="text-center text-xl font-semibold">
            {editingTodo ? "EDIT NOTE" : "NEW NOTE"}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Input
            placeholder="Enter your note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded-lg py-3 px-4 w-full focus:ring-primary focus:border-primary text-base"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
          />
        </div>
        <DialogFooter className="flex flex-row justify-between p-4 pt-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-primary text-primary hover:bg-primary/10 rounded-lg h-12 px-6"
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            onClick={handleSave}
            className="bg-primary text-white hover:bg-primary/90 rounded-lg h-12 px-6"
          >
            APPLY
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
