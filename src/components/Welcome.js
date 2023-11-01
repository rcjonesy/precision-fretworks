import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import  '../index.css'







export const Welcome= () => {
  return (
   
    <div className="min-h-screen flex items-start justify-center flex-col text-white ml-20">
      <div className="text-center"> {/* Center-align content horizontally */}
        <h1 className="text-6xl font-bold mb-6">Welcome to Precision Fretworks</h1>
        <Link to="/login" className="hover:underline text-lg text-white">
          Get Started
        </Link>
      </div>
      <footer className="p-4 fixed bottom-0 left-0 w-full">
        <div className='flex justify-end items-center h-full'>
          <div>
            <Link to="http://www.facebook.com">
              <button className="mr-8 text-3xl text-blue-700 p-0 border-none rounded-full m-0 hover:text-blue-700">
                <BsFacebook />
              </button>
            </Link>
          </div>
          <div>
            <Link to="http://www.instagram.com">
              <button className="text-white mr-11 text-3xl bg-gradient-to-r from-[#fa7e1e] via-[#d62976] to-[#962fbf] rounded-full ml-6 hover:from-[#ff9926] hover:via-[#ff3e4c] hover:to-[#a44cc7]">
                <BsInstagram />
              </button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
  
  
  
}








