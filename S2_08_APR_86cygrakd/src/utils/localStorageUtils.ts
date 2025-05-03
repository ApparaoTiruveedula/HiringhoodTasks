import { Task } from "../features/tasks";

export const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const loadTasksFromStorage = (): Task[] => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
};
