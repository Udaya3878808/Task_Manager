import { createContext, useContext, useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/taskApi";

import toast from "react-hot-toast"
import type { Task } from "../api/taskApi";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  fetchAllTasks: () => void;
  addTask: (task: Omit<Task, "id">) => void;
  editTask: (id: number, task: Omit<Task, "id">) => void;
  removeTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //  Fetch all tasks
  const fetchAllTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
        toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  //  Add task
  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
      toast.success("Task added successfully ");
    } catch (error) {
        toast.error("Failed to create task ");
    }
  };

  //  Edit task
  const editTask = async (
    id: number,
    updatedTask: Omit<Task, "id">
  ) => {
    try {
      const updated = await updateTask(id, updatedTask);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? updated : task
        )
      );
      toast.success("Task updated ");
    } catch (error) {
        toast.error("Failed to update task");
    }
  };

  //  Delete task
  const removeTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) =>
        prev.filter((task) => task.id !== id)
      );
      toast.success("Task deleted");
    } catch (error) {
        toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchAllTasks,
        addTask,
        editTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }
  return context;
};
