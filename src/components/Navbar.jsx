import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Home, Package, Info, LogOut, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("https://e-commerce-website-test.onrender.com/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      alert("Logout failed");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 transition duration-200 ${
      isActive
        ? "text-blue-400 border-b-2 border-blue-400 pb-1"
        : "hover:text-blue-400"
    }`;

  return (
    <nav className="bg-gray-900 text-white shadow-lg relative">

      {/* ── Main Bar ── */}
      <div className="flex items-center justify-between px-5 py-4 md:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/dal1ft5go/image/upload/f_auto,q_auto/Picsart_26-03-24_23-54-01-849_ejep9i"
            alt="shop"
            className="w-10 h-10 object-cover rounded-lg"
          />
          <p className="text-2xl font-bold text-blue-400 tracking-wide">ShopZone</p>
        </Link>

        {/* ── Desktop Nav Links — hidden on mobile ── */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          <li>
            <NavLink to="/home" className={navLinkClass}>
              <Home size={16} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={navLinkClass}>
              <Package size={16} /> Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              <Info size={16} /> About
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={navLinkClass}>
              <div className="relative flex items-center gap-1">
                <ShoppingCart size={16} /> Cart
                {totalItems > 0 && (
                  <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 cursor-pointer"
            >
              <LogOut size={16} /> Logout
            </button>
          </li>
        </ul>

        {/* ── Mobile Right Side: Cart icon + Hamburger ── */}
        <div className="flex items-center gap-4 md:hidden">

          {/* Cart icon with badge */}
          <NavLink to="/cart" className="relative">
            <ShoppingCart size={22} className="text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

      </div>

      {/* ── Mobile Slide-down Menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-5 py-4 flex flex-col gap-1 border-t border-gray-700">

          <NavLink
            to="/home"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition ${
                isActive ? "bg-gray-700 text-blue-400" : "text-white hover:bg-gray-700"
              }`
            }
          >
            <Home size={18} /> Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition ${
                isActive ? "bg-gray-700 text-blue-400" : "text-white hover:bg-gray-700"
              }`
            }
          >
            <Package size={18} /> Products
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition ${
                isActive ? "bg-gray-700 text-blue-400" : "text-white hover:bg-gray-700"
              }`
            }
          >
            <Info size={18} /> About
          </NavLink>

          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition ${
                isActive ? "bg-gray-700 text-blue-400" : "text-white hover:bg-gray-700"
              }`
            }
          >
            <ShoppingCart size={18} /> Cart
            {totalItems > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Divider */}
          <div className="h-px bg-gray-700 my-1" />

          <button
            onClick={() => { handleLogout(); closeMenu(); }}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition cursor-pointer"
          >
            <LogOut size={18} /> Logout
          </button>

        </div>
      )}

    </nav>
  );
};

export default Navbar;