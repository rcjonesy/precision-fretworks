import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";
import { MainFooter } from "../MainFooter";
import { BsInstagram } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'



export const Login = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        if (user.isStaff) {
          localStorage.setItem(
            "learning_user",
            JSON.stringify({
              id: user.id,
            })
          );
          navigate("/employees"); // Navigate to the employees page for staff
        } else {
          localStorage.setItem(
            "learning_user",
            JSON.stringify({
              id: user.id,
            })
          )
          navigate("/repairrequestform"); // Navigate to a different page for non-staff (e.g., customers)
        }
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <div className="min-h-screen flex justify-around mr-20 text-white">
    {/* <nav className="p-4">
    <div className="mt-7" style={{ marginLeft: '4rem' }}>
          <Link to="/" className="text-white text-7xl ml-20 mt-20">
            {/* Precision Fretworks */}
          {/* </Link> */}
        {/* </div> */}
    {/* </nav> */} 
  
    <main className="min-h-screen flex items-center justify-around">
      <form className="bg-white bg-opacity-10 p-10 rounded-lg shadow-md w-96" onSubmit={handleLogin}>
        <h1 className="text-5xl mb-9 logo">Welcome to Precision Fretworks</h1>
        <h2 className="text-2xl mb-6">Please sign in</h2>
        <div className="mb-6">
          <input
            type="email"
            value={email}
            className="w-full px-4 py-3 bg-slate-700 border border-gray-400 rounded-md text-xl focus:outline-none focus:ring focus:border-blue-500"
            onChange={(evt) => setEmail(evt.target.value)}
            placeholder="Email Address"
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md text-xl hover:bg-blue-700"
          >
            Sign in
          </button>
        </div>
        <div className="mt-6">
          <Link to="/register" className="text-white hover:underline text-xl">
            Not a member yet? 
          </Link>
        </div>
      </form>
    </main>
    <MainFooter />
  </div>
  
  );
  
}
