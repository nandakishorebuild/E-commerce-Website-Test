import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const About = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://e-commerce-website-test.onrender.com/home", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
      })
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={username} email={email} />

      {/* Center Middle of Page */}
      <div className="flex flex-col justify-center items-center min-h-[90vh] text-center px-5 py-10">

        {/* Icon */}
        <p className="text-5xl md:text-6xl mb-4">🛒</p>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-3">
          About ShopZone
        </h1>

        {/* Underline */}
        <div className="w-16 md:w-20 h-1 bg-blue-600 rounded-full mb-6"></div>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-lg max-w-xs md:max-w-xl leading-relaxed mb-3">
          ShopZone is a modern e-commerce platform built to give you the best
          shopping experience. Browse hundreds of products across all categories
          at the best prices.
        </p>

        <p className="text-gray-500 text-sm md:text-lg max-w-xs md:max-w-xl leading-relaxed mb-8">
          We believe shopping should be simple, fast, and enjoyable — so we
          built ShopZone just for that.
        </p>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 w-full max-w-xs sm:max-w-2xl">

          <div className="bg-white rounded-xl shadow px-6 py-5 flex flex-col items-center gap-2">
            <p className="text-3xl">🚀</p>
            <p className="font-bold text-gray-700">Fast Delivery</p>
            <p className="text-gray-400 text-sm text-center">Get your orders delivered quickly</p>
          </div>

          <div className="bg-white rounded-xl shadow px-6 py-5 flex flex-col items-center gap-2">
            <p className="text-3xl">🔒</p>
            <p className="font-bold text-gray-700">Secure Payments</p>
            <p className="text-gray-400 text-sm text-center">Your data is always safe with us</p>
          </div>

          <div className="bg-white rounded-xl shadow px-6 py-5 flex flex-col items-center gap-2">
            <p className="text-3xl">💰</p>
            <p className="font-bold text-gray-700">Best Prices</p>
            <p className="text-gray-400 text-sm text-center">Top products at unbeatable prices</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;