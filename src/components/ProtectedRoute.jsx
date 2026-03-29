import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://e-commerce-website-test.onrender.com/home", { withCredentials: true })
      .then(() => setLoading(false))
      .catch(() => navigate("/login"));
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-white text-xl">Loading...</div>;

  return children;
};

export default ProtectedRoute;