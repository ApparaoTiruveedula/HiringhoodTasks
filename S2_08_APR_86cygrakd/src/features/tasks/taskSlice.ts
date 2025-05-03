import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "./taskTypes";
import { saveTasksToStorage,loadTasksFromStorage } from "../../utils/localStorageUtils"; // Update the path as needed

// Snackbar state type
type SnackbarState = {
  message: string;
  type: "success" | "error";
};

// Main state type for the tasks slice
interface TaskState {
  tasks: Task[];
  snackbar: SnackbarState;
}

// Initial state with tasks loaded from localStorage
const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
  snackbar: { message: "", type: "success" },
};

// Task slice definition
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      state.snackbar = { message: "Task added!", type: "success" };
      saveTasksToStorage(state.tasks);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.snackbar = { message: "Task updated!", type: "success" };
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      state.snackbar = { message: "Task deleted!", type: "success" };
      saveTasksToStorage(state.tasks);
    },
    clearSnackbar(state) {
      state.snackbar = { message: "", type: "success" };
    },
  },
});

// Export actions and reducer
export const { addTask, updateTask, deleteTask, clearSnackbar } = taskSlice.actions;
export default taskSlice.reducer;
