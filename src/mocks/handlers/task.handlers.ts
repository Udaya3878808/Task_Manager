import { http, HttpResponse } from "msw";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const storedTasks = localStorage.getItem("tasks");

let tasks: Task[] = storedTasks
  ? JSON.parse(storedTasks)
  : [
      {
        id: 1,
        title: "Design Login Page",
        description: "Create responsive login UI using Tailwind CSS",
        status: "Pending",
      },
    ];


const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const taskHandlers = [
  // GET
  http.get("/task", () => {
    return HttpResponse.json(tasks);
  }),

  // POST
  http.post("/tasks", async ({ request }) => {
    const body = (await request.json()) as Omit<Task, "id">;

    const newTask: Task = {
      id: Date.now(),
      ...body,
    };

    tasks.push(newTask);
    saveTasks();

    return HttpResponse.json(newTask);
  }),

  // PUT
  http.put("/tasks/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Omit<Task, "id">;

    tasks = tasks.map((task) =>
      task.id === id ? { ...task, ...body } : task
    );

    saveTasks();

    const updatedTask = tasks.find((task) => task.id === id);

    return HttpResponse.json(updatedTask);
  }),

  // DELETE
  http.delete("/tasks/:id", ({ params }) => {
    tasks = tasks.filter((t) => t.id !== Number(params.id));

    saveTasks();

    return HttpResponse.json({ success: true });
  }),
];
