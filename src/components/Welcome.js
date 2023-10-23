import React from "react";
import { Link } from "react-router-dom";


export const Welcome= () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-6 text-white">Welcome to Precision Fretworks</h1>
    </div>
    <div className="text-center">
      <Link to="/login" className="text-blue-500 hover:underline text-lg text-white">
        Get Started
      </Link>
    </div>
  </div>
  
  
  );
};
