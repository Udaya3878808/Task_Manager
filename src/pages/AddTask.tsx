import { useState } from "react";
import TaskList from "../pages/TaskList";
import AddTaskForm from "../pages/AddTaskForm";

const AddTask = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-500 to-pink-500 p-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-700">
            Task Manager
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-200"
          >
            + Add Task
          </button>
        </div>

       
        <div className="flex gap-3 mb-6">
          {["All", "Pending", "Completed"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200
                ${
                  filter === item
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-purple-200"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        
        <TaskList filter={filter} />

      </div>

      {showForm && (
        <AddTaskForm close={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default AddTask;
