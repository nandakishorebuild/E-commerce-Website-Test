import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export const checkPasswordStrength = (pwd) => {
  const checks = [
    pwd.length >= 8,
    /[A-Z]/.test(pwd),
    /[a-z]/.test(pwd),
    /[0-9]/.test(pwd),
    /[^A-Za-z0-9]/.test(pwd),
  ];

  const passed = checks.filter(Boolean).length;

  if (passed === 1) return "Level 1";
  if (passed >= 2 && passed <= 3) return "Level 2";
  if (passed >= 4) return "Level 3";
  return "Weak Password";
};





const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (strength === "Weak Password" || strength === "Level 1") {
    alert("Please use a stronger password");
    return;
  }


    try {
      const response = await axios.post("http://localhost:5731/register", 
  { username, email, password },
  { withCredentials: true }
);

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      alert(message);
}

  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-400">
      <div className="w-96 px-8 py-5 rounded-xl 
        bg-white/10 backdrop-blur-lg 
        border border-white/20 
        shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-white text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white">Username</label>
            <input id="username" type="text" className="w-full px-3 py-2 rounded-md 
              bg-white/20 text-white placeholder-gray-200 
              border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-blue-400" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-4 text-white">
            <label htmlFor="email" className="block text-white">Email</label>
            <input id="email" type="email" className="w-full px-3 py-2 rounded-md 
              bg-white/20 text-white placeholder-gray-200 
              border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4 text-white">
            <label htmlFor="password" className="block text-white">Password</label>
            <input id="password" type="password" className="w-full px-3 py-2 rounded-md 
              bg-white/20 text-white placeholder-gray-200 
              border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-blue-400" value={password}  
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setStrength(checkPasswordStrength(value)); 
            }} required />
            {strength && (
              <p className={`text-sm mt-1 font-semibold
                ${strength === "Level 3" ? "text-green-600" : ""}
                ${strength === "Level 2" ? "text-yellow-600" : ""}
                ${strength === "Level 1" || strength === "Weak Password" ? "text-red-500" : ""}
              `}>
                Strength: {strength}
              </p>
            )}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer
            shadow-lg hover:bg-blue-700
            active:scale-95 active:shadow-md
            transition-all duration-150">
          Submit
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500 font-bold">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;