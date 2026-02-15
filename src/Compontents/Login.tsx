import { useState } from "react";
import { useAuth } from "../Context_Api/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await loginUser({ userName, password });

    navigate("/"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-purple-400 to-pink-400">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[350px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border px-4 py-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
