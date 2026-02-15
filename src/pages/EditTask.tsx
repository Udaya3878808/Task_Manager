import { useState } from "react";
import { useTasks } from "../Context_Api/TaskContext";
import type { Task } from "../api/taskApi";

interface Props {
  task: Task;
  close: () => void;
}

const EditTask = ({ task, close }: Props) => {
  const { editTask } = useTasks();

  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await editTask(task.id, {
      title,
      description: desc,
      status,
    });

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 w-[400px] rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          Edit Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border px-3 py-2 rounded"
          />

          <input
            type="text"
            value={desc}
            onChange={(e) =>
              setDesc(e.target.value)
            }
            className="border px-3 py-2 rounded"
          />

           <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="Pending">
              Pending
            </option>
            <option value="Completed">
              Completed
            </option>
          </select>


          <div className="flex justify-between mt-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>

            <button
              type="button"
              onClick={close}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
