import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskProvider } from "./Context_Api/TaskContext";
import { AuthProvider } from "./Context_Api/AuthContext";
import { Toaster } from "react-hot-toast";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </StrictMode>
  );
});