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
    <nav className="bg-black p-4">
      <div className=" mx-auto flex  items-center">
        <div>
          <Link to="/" className="text-white text-5xl font-bold ml-5">
            Precision Fretworks
          </Link>
        </div>
        <div className="ml-auto flex">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/repairrequest" className="text-white hover:text-gray-400">
              View all Repairs
            </Link>
          </li>
          <li>
            <Link to="/repairrequestform" className="text-white hover:text-gray-400 ml-10 mr-5 ">
              New Repair
            </Link>
          </li>
        </ul>
        
          <button onClick={handleLogout} className="text-white hover:text-gray-400 mr-5 ml-10">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
