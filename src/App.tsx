
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Compontents/Login";
import AddTask from "./pages/AddTask";
import ProtectedRoute from "./Compontents/ProtectedRouter";
import Navbar from "./Compontents/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
