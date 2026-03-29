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
      
    <div className="h-[90vh] flex items-center justify-center gap-16 px-10 bg-gradient-to-r from-blue-50 to-purple-100">

  {/* LEFT SIDE - TEXT */}
  <div className="max-w-xl">
    <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
      Welcome, {username} 
    </h1>

    <p className="text-xl mb-8 text-gray-600">
      Discover the best deals on top products
    </p>

    <button
      onClick={() => navigate("/products")}
      className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-xl active:scale-95 transition-all duration-200"
    >
      Shop Now
    </button>
  </div>

  {/* RIGHT SIDE - IMAGE */}
  <div className="w-1/2 flex justify-center">
    <img
      src="https://res.cloudinary.com/dal1ft5go/image/upload/f_auto,q_auto/1774374407743_neumhf"
      alt="shopping"
      //className="w-[400px] h-auto object-contain"
      className="w-[500px] h-fit hover:scale-105 transition duration-300"
    />
  </div>

</div>


    </div>
  );
};

export default Home;