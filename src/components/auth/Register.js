import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    const newUser = {
      ...user,
      isStaff: user.isStaff = false,
    };

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <div>
      <main className="min-h-screen flex items-center justify-start ml-80">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-96"
          onSubmit={handleRegister}
        >
          {/* <h1 className="text-3xl font-bold mb-4">Precision Fretworks</h1> */}
          <h2 className="text-lg mb-4">Please Register</h2>
          <div className="mb-4">
            <input
              onChange={updateUser}
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Email address"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
