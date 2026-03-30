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
  const response = await axios.post(
    "https://e-commerce-website-test.onrender.com/login",
    { username, password },
    { withCredentials: true}
  );

  if (response.data.message === "Login successful") {
    setError(""); // clear error
    navigate("/home");
  }
} catch (err) {
  const message = err.response?.data?.message || "Invalid credentials";
  setError(message); // ✅ store error instead of alert
}
  };

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-black text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
              className="w-full px-3 py-2 rounded-lg 
              bg-white text-gray-800 placeholder-gray-400
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
              transition"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 rounded-lg 
              bg-white text-gray-800 placeholder-gray-400
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
              transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
  <p className="text-red-500 text-sm mt-1">
    {error}
  </p>
)}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer
            shadow-lg hover:bg-blue-700
            active:scale-95 active:shadow-md
            transition-all duration-150">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-blue-500 font-bold">Register</Link>
        </div>
      </div>


      <img 
        src="https://res.cloudinary.com/dgle0w6mi/image/upload/f_auto,q_auto/1774366038433_dfd8v4"
        alt="login"
        className="w-90 h-94 object-cover rounded-lg"
      />
    </div>
  );
};

export default Login;