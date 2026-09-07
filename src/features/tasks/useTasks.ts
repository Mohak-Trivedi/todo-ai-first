import { useState } from "react";
import type { Task } from "./Task";

export interface UseTasksResult {
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
}

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string): void => {
    const trimmed = title.trim();
    if (trimmed === "") {
      return;
    }

    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title: trimmed }]);
  };

  const removeTask = (id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, removeTask };
}
