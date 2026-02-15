import { useAuth } from "../Context_Api/AuthContext";
import { useNavigate } from "react-router-dom";
import Profile1 from "../assets/profile1.avif"

const Navbar = () => {
  const { user, logoutUser, isAuthenticated } =
    useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="bg-purple-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">
        Task Manager
      </h1>
      {!isAuthenticated ? (
      <button
        onClick={() => navigate("/login")}
        className="bg-white text-purple-900 px-5 py-2 rounded-full 
                   font-semibold hover:scale-105 transition-all duration-200"
      >
        Login
      </button>
    ) : (
      <div className="flex items-center gap-6">
       
        <button
          onClick={handleLogout}
          className="font-medium text-white hover:underline hover:decoration-purple-400 transition duration-200"
        >
          Logout
        </button>

        <div className="flex flex-col items-center">
          <img
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
            src={Profile1}
            alt="profile"
          />
          <span className="text-xs font-medium mt-1">
            {user?.userName}
          </span>
        </div>

      </div>
    )}
    </div>
  );
};

export default Navbar;
