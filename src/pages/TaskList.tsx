import { useState } from "react";
import { useTasks } from "../Context_Api/TaskContext";
import type { Task } from "../api/taskApi";
import EditTask from "./EditTask";

interface Props {
  filter: string;
}

const TaskList = ({ filter }: Props) => {
  const { tasks, removeTask } = useTasks();

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleDelete = (id: number) => {
    removeTask(id);
    setOpenMenuId(null);
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setOpenMenuId(null);
  };
  
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-300 p-4 rounded-lg relative shadow-sm bg-white 
             transition-all duration-300 ease-in-out 
             hover:shadow-xl hover:-translate-y-1 hover:border-purple-400"
          >
            <h3 className=" text-purple-900 text-2xl font-semibold">
              {task.title}
            </h3>

            <div className="flex justify-between">
              <p className="text-purple-900 text-sm">
                {task.description}
              </p>
             
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium
                  ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
              >
                {task.status}
              </span>
            </div>

            {/* 3 Dot Button */}
            <button
              className="absolute top-3 right-3 text-lg"
              onClick={() =>
                setOpenMenuId(
                  openMenuId === task.id ? null : task.id
                )
              }
            >
              ⋮
            </button>

            {/* Dropdown */}
            {openMenuId === task.id && (
              <div className="absolute top-10 right-3 bg-white border rounded shadow-md p-2 z-10">
                <button
                  onClick={() => handleEditClick(task)}
                  className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="block w-full text-left px-3 py-1 text-red-500 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {selectedTask && (
        <EditTask
          task={selectedTask}
          close={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;
