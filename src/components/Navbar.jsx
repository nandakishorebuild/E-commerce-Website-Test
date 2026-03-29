import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Home, Package, Info, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleLogout = () => {
    axios
      .post("https://e-commerce-website-test.onrender.com//logout", {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch(() => alert("Logout failed"));
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between shadow-lg">
      
      <div className="text-2xl font-bold text-blue-400 tracking-wide">
        <Link to="/" className="flex justify-between items-center gap-3 cursor-pointer">
        <div className="flex justify-between items-center gap-3">
        <img 
        src="https://res.cloudinary.com/dal1ft5go/image/upload/f_auto,q_auto/Picsart_26-03-24_23-54-01-849_ejep9i"
        alt="shop"
        className="w-12 h-12 object-cover rounded-lg"
      /> 
      <p className="text-3xl font-bold text-blue-400 tracking-wide pt-2">ShopZone</p>
      </div>
      </Link>
      </div>

      <ul className="flex items-center gap-8 text-sm font-medium">
        <li>
          <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-1 transition duration-200 ${
              isActive
                ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                : "hover:text-blue-400"
            }`
          }
        >
          <Home size={16} /> Home
        </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-1 transition duration-200 ${
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "hover:text-blue-400"
              }`
            }
          >
            <Package size={16} /> Products
          </NavLink>
        </li>
        <li>
          <NavLink
  to="/about"
  className={({ isActive }) =>
    `flex items-center gap-1 ${
      isActive
        ? "text-blue-400 border-b-2 border-blue-400 pb-1"
        : "hover:text-blue-400"
    }`
  }
>
  <Info size={16} /> About
</NavLink>
        </li>
        <li>
          <NavLink
  to="/cart"
  className={({ isActive }) =>
    `flex items-center gap-1 relative ${
      isActive
        ? "text-blue-400 border-b-2 border-blue-400 pb-1"
        : "hover:text-blue-400"
    }`
  }
>
  <ShoppingCart size={16} /> Cart
  {totalItems > 0 && (
    <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {totalItems}
    </span>
  )}
</NavLink>
        </li>
        <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 cursor-pointer"
      >
        <LogOut size={16} /> Logout
      </button>
      </ul>

    </nav>
  );
};

export default Navbar;