import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://e-commerce-website-test.onrender.com/home", { withCredentials: true })
      .then((res) => setUsername(res.data.username))
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-10 py-10 md:py-0 bg-gradient-to-r from-blue-50 to-purple-100">

        {/* LEFT SIDE - TEXT */}
        <div className="w-full md:max-w-xl text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4 text-gray-800">
            Welcome, {username}
          </h1>

          <p className="text-base md:text-xl mb-6 md:mb-8 text-gray-600">
            Discover the best deals on top products
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-semibold px-10 py-3 md:py-4 rounded-full shadow-xl active:scale-95 transition-all duration-200 w-full md:w-auto"
          >
            Shop Now
          </button>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://res.cloudinary.com/dal1ft5go/image/upload/f_auto,q_auto/1774374407743_neumhf"
            alt="shopping"
            className="w-64 md:w-[500px] h-fit hover:scale-105 transition duration-300"
          />
        </div>

      </div>
    </div>
  );
};

export default Home;