import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { Search } from "lucide-react";

// ===== SKELETON CARD =====
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-square bg-gray-300"></div>
      <div className="p-3 flex flex-col gap-2">
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-8 bg-gray-300 rounded-lg w-full mt-1"></div>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const productsPerPage = 10;
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  // ===== Get User Info =====
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("https://e-commerce-website-test.onrender.com/home", {
          withCredentials: true,
        });
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        navigate("/login");
      }
    };
    getUser();
  }, []);

  // ===== Fetch Products or Search =====
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (searchWord.trim() !== "") {
          setIsSearching(true);
          const res = await axios.get(
            `https://dummyjson.com/products/search?q=${searchWord}&limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`
          );
          setProducts(res.data.products);
          setTotalProducts(res.data.total);
        } else {
          setIsSearching(false);
          const skip = (currentPage - 1) * productsPerPage;
          const res = await axios.get(
            `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
          );
          setProducts(res.data.products);
          setTotalProducts(res.data.total);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchWord, currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleSearch = () => {
    if (searchInput.trim() === "") return;
    setCurrentPage(1);
    setSearchWord(searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    setSearchInput("");
    setSearchWord("");
    setCurrentPage(1);
    setIsSearching(false);
  };

  const getCartItem = (productId) => {
    return cartItems.find((item) => item.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={username} email={email} />

      {/* ===== SEARCH BAR ===== */}
      <div className="px-4 md:px-8 pt-4 md:pt-6 pb-2 flex items-center justify-center">
        <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 w-full max-w-4xl">

          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 md:px-5 py-2.5 md:py-3 text-gray-700 text-sm md:text-base outline-none bg-transparent"
          />

          {searchInput && (
            <button
              onClick={handleClear}
              className="px-2 md:px-3 text-gray-400 hover:text-red-500 text-lg font-bold transition-all"
            >
              ✕
            </button>
          )}

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-5 py-2.5 md:py-3 flex items-center gap-1 md:gap-2 text-sm md:text-base font-medium transition duration-150 active:scale-95"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </button>

        </div>
      </div>
      {/* ===== END SEARCH BAR ===== */}

      <div className="px-4 md:px-8 py-4 md:py-6">

        {/* Title Row */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h1 className="text-base md:text-2xl font-bold text-gray-800 truncate pr-2">
            {isSearching
              ? `"${searchWord}" (${totalProducts})`
              : `All Products 🛍️`}
          </h1>
          <p className="text-gray-400 text-xs md:text-sm whitespace-nowrap">
            Page {currentPage} of {totalPages || "..."}
          </p>
        </div>

        {/* No Results Found */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 gap-3">
            <p className="text-5xl">😕</p>
            <p className="text-base md:text-xl font-semibold text-gray-500 text-center">
              No products found for "{searchWord}"
            </p>
            <button
              onClick={handleClear}
              className="text-blue-500 underline text-sm mt-1"
            >
              Clear search
            </button>
          </div>
        )}

        {/* ===== SKELETON LOADING ===== */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* ===== PRODUCTS GRID ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {products.map((product) => {
                const cartItem = getCartItem(product.id);
                const isInCart = cartItem !== undefined;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-200 transition duration-200 overflow-hidden flex flex-col"
                  >
                    {/* Product Image */}
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full aspect-square object-contain p-2 md:p-4 bg-white"
                    />

                    <div className="p-2 md:p-3 flex flex-col flex-1 border-t border-gray-100">

                      {/* Product Name */}
                      <h2 className="text-xs md:text-sm text-gray-800 mb-1 line-clamp-2 leading-snug">
                        {product.title}
                      </h2>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-1">
                        <span className="bg-green-600 text-white text-xs px-1 md:px-1.5 py-0.5 rounded font-medium">
                          {product.rating} ⭐
                        </span>
                      </div>

                      {/* Price */}
                      <p className="text-sm md:text-lg font-bold flex justify-end text-gray-900 mt-1">
                        ${product.price}
                      </p>

                      {/* Add to Cart / Plus Minus */}
                      {isInCart ? (
                        <div className="flex items-center justify-between mt-2 md:mt-3 bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-bold flex items-center justify-center active:scale-95 transition-all"
                          >
                            −
                          </button>
                          <span className="font-bold text-blue-700 text-sm md:text-lg">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(product.id)}
                            className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-bold flex items-center justify-center active:scale-95 transition-all"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="mt-2 md:mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-1.5 md:py-2 rounded-lg text-xs md:text-sm active:scale-95 transition-all duration-150"
                        >
                          Add to Cart 🛒
                        </button>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>

            {/* ===== PAGINATION ===== */}
          {/* ===== PAGINATION ===== */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-1.5 md:gap-3 mt-8 md:mt-10 flex-wrap">

    {/* Prev */}
    <button
      onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo(0, 0); }}
      disabled={currentPage === 1}
      className="px-3 md:px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      ← Prev
    </button>

    {/* Mobile — max 4 page numbers */}
    <div className="flex gap-1.5 sm:hidden">
      {(() => {
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages, start + 3);
        if (end - start < 3) start = Math.max(1, end - 3);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => { setCurrentPage(pageNumber); window.scrollTo(0, 0); }}
              className={`w-9 h-9 rounded-lg font-medium border text-sm ${
                currentPage === pageNumber
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>
          )
        );
      })()}
    </div>

    {/* Laptop — all page numbers exactly as original */}
    <div className="hidden sm:flex gap-3 flex-wrap">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => {
              setCurrentPage(pageNumber);
              window.scrollTo(0, 0);
            }}
            className={`px-4 py-2 rounded-lg font-medium border ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        )
      )}
    </div>

    {/* Next */}
    <button
      onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo(0, 0); }}
      disabled={currentPage === totalPages}
      className="px-3 md:px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Next →
    </button>

  </div>
)}
            {/* ===== END PAGINATION ===== */}

          </>
        )}
      </div>
    </div>
  );
};

export default Products;