import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";

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
        window.alert("Invalid login");
      }
    })
  }

  return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <form className="bg-slate-100 p-10 rounded-lg shadow-md w-96" onSubmit={handleLogin}>
        <h1 className="text-4xl font-bold mb-6">Precision Fretworks</h1>
        <h2 className="text-2xl mb-6">Please sign in</h2>
        <div className="mb-6">
          <input
            type="email"
            value={email}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-xl focus:outline-none focus:ring focus:border-blue-400"
            onChange={(evt) => setEmail(evt.target.value)}
            placeholder="RyanJones@email.com"
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <button
            // onClick={handleLogin}
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md text-xl hover:bg-blue-600"
          >
            
              Sign in
            
          </button>
        </div>
        <div className="mt-6 text-center">
          <Link to="/register" className="text-blue-500 hover:underline text-xl">
            Not a member yet?
          </Link>
        </div>
      </form>

    </main>
  );
};
