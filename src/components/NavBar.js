import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here, e.g., remove user data from localStorage
    localStorage.removeItem("learning_user");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-b from-black to-transparent p-4 pt-9 mb-20 ">
      <div className=" mx-auto flex items-center">
        <div style={{ marginLeft: '4rem' }}>
          <Link to="/" className="text-white text-7xl ml-20">
            Precision Fretworks
          </Link>
        </div>
        <div className="ml-auto flex">
          <ul className="flex justify space-x-4">
            <li>
              <Link to="/repairrequest" className="text-white hover:text-gray-400 mr-11 mr-20 text-lg">
                View all Repairs
              </Link>
            </li>
            <li>
              <Link to="/repairrequestform" className="text-white hover:text-gray-400 ml-10 mr-20 text-lg">
                New Repair
              </Link>
            </li>
          </ul>

          <button onClick={handleLogout} className="text-white hover:text-gray-400 mr-20 ml-20 text-lg">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
