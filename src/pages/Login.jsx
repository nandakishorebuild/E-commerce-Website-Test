import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://e-commerce-website-test.onrender.com/login",
        { username, password },
        { withCredentials: true }
      );

      setError("");
      navigate("/home");

    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex flex-col">

      {/* ── ShopZone Logo — top center, both mobile + laptop ── */}
      <div className="flex justify-center items-center pt-8 pb-4 gap-3">
        <img
          src="https://res.cloudinary.com/dal1ft5go/image/upload/f_auto,q_auto/Picsart_26-03-24_23-54-01-849_ejep9i"
          alt="shop"
          className="w-10 h-10 object-cover rounded-lg"
        />
        <p className="text-2xl font-bold text-blue-500 tracking-wide">ShopZone</p>
      </div>

      {/* ── Form + Image ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-evenly flex-1 pb-10">

        {/* Form Card */}
        <div className="flex-1 flex items-center justify-center px-5 py-6 md:flex-none md:px-0 md:py-0">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm md:w-96 border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-black text-center">Login</h2>
            <form onSubmit={handleSubmit}>

              {/* Username */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter username"
                  className="w-full px-3 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Password"
                  className="w-full px-3 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer shadow-lg hover:bg-blue-700 active:scale-95 active:shadow-md transition-all duration-150"
              >
                Login
              </button>
            </form>

            <div className="text-center mt-3">
              <p>Don't have an account?</p>
              <Link to="/register" className="text-blue-500 font-bold">Register</Link>
            </div>
          </div>
        </div>

        {/* Image — hidden on mobile, visible on laptop */}
        <img
          src="https://res.cloudinary.com/dgle0w6mi/image/upload/f_auto,q_auto/1774366038433_dfd8v4"
          alt="login"
          className="hidden md:block md:w-96 md:h-[380px] object-cover rounded-lg"
        />

      </div>
    </div>
  );
};

export default Login;