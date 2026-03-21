import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5731/home", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:5731/logout", {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch(() => alert("Logout failed"));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Welcome {username} 🎉
      </h1>

      <button
        onClick={handleLogout}
        className="w-1/4 bg-blue-600 text-white px-6 py-2 rounded-md 
shadow-lg hover:bg-blue-700 
active:scale-95 active:shadow-md 
transition-all duration-150"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;