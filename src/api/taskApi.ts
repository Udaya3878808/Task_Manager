import {axiosInstance} from "./config"


export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
  }
 
  // get

  export const getTasks = async (): Promise<Task[]> => {
    const response = await axiosInstance.get("task");
    return response.data;
  };

  // post

  export const createTask = async (
    task: Omit<Task, "id">
  ): Promise<Task> => {
    const response = await axiosInstance.post("tasks", task);
    return response.data;
  };

   // put

  export const updateTask = async (
    id: number,
    updatedTask: Omit<Task, "id">
  ): Promise<Task> => {
    const response = await axiosInstance.put(`tasks/${id}`, updatedTask);
    return response.data;
  };

  // Delete

  export const deleteTask = async (id: number): Promise<void> => {
    await axiosInstance.delete(`tasks/${id}`);
  };