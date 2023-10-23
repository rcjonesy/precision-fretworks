import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here, e.g., remove user data from localStorage
    localStorage.removeItem("learning_user");
    navigate("/login");
  };

  return (
    <nav className= "bg-gray-500/50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          My App
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/allposts" className="text-white hover:text-gray-400">
              Posts
            </Link>
          </li>
          <li>
            <Link to="/newpost" className="text-white hover:text-gray-400">
              New Post
            </Link>
          </li>
          <li>
            <Link to="/myposts" className="text-white hover:text-gray-400">
              My Posts
            </Link>
          </li>
          <li>
            <Link to="/myfavorites" className="text-white hover:text-gray-400">
              My Favorites
            </Link>
          </li>
          {/* Add more navigation links here if needed */}
        </ul>
        <button
          onClick={handleLogout}
          className="text-white hover:text-gray-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
