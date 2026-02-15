import { useState } from "react";
import { useTasks } from "../Context_Api/TaskContext";

interface Props {
  close: () => void;
}

const AddTaskForm = ({ close }: Props) => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !desc || !status) {
      alert("All fields required");
      return;
    }

    await addTask({
      title,
      description: desc,
      status,
    });

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-[400px] rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          Add New Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border px-3 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Description"
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
              Add
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

export default AddTaskForm;
