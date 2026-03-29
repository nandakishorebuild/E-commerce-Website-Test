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
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-9 bg-gray-300 rounded-lg w-full mt-2"></div>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // searchInput = what user is currently typing
  const [searchInput, setSearchInput] = useState("");

  // searchWord = what was actually submitted (enter or icon click)
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
          // SEARCH MODE
          setIsSearching(true);
          const res = await axios.get(
            `https://dummyjson.com/products/search?q=${searchWord}&limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`
          );
          setProducts(res.data.products);
          setTotalProducts(res.data.total);
        } else {
          // NORMAL MODE
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

  // ===== Handle Search Submit =====
  const handleSearch = () => {
    if (searchInput.trim() === "") return;
    setCurrentPage(1);
    setSearchWord(searchInput);
  };

  // ===== Handle Enter Key =====
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ===== Handle Clear =====
  const handleClear = () => {
    setSearchInput("");
    setSearchWord("");
    setCurrentPage(1);
    setIsSearching(false);
  };

  // ===== Check cart item =====
  const getCartItem = (productId) => {
    return cartItems.find((item) => item.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar username={username} email={email} />

      {/* ===== SEARCH BAR ===== */}
      <div className="px-8 pt-6 pb-2 flex items-center justify-center">
        <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 max-w-4xl w-full">

          {/* Text Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-5 py-3 text-gray-700 text-base outline-none bg-transparent"
          />

          {/* Clear Button - only shows when something is typed */}
          {searchInput && (
            <button
              onClick={handleClear}
              className="px-3 text-gray-400 hover:text-red-500 text-xl font-bold transition-all"
            >
              ✕
            </button>
          )}

          {/* Search Icon Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 flex items-center gap-2 font-medium transition duration-150 active:scale-95"
          >
            <Search size={18} />
            Search
          </button>

        </div>
      </div>
      {/* ===== END SEARCH BAR ===== */}

      <div className="p-8">

        {/* Title Row */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {isSearching
              ? `Results for "${searchWord}" (${totalProducts} found)`
              : `All Products 🛍️`}
          </h1>
          <p className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages || "..."}
          </p>
        </div>

        {/* No Results Found */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 gap-3">
            <p className="text-5xl">😕</p>
            <p className="text-xl font-semibold text-gray-500">
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

        {/* Skeleton Loading */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                      className="w-full aspect-square object-contain p-4 bg-white"
                    />

                    <div className="p-3 flex flex-col flex-1 border-t border-gray-100">

                      {/* Product Name */}
                      <h2 className="text-sm text-gray-800 mb-1 line-clamp-2 leading-snug">
                        {product.title}
                      </h2>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-1">
                        <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                          {product.rating} ⭐
                        </span>
                      </div>

                      {/* Price */}
                      <p className="text-lg font-bold flex justify-end text-gray-900 mt-1">
                        ${product.price}
                      </p>

                      {/* Add to Cart / Plus Minus */}
                      {isInCart ? (
                        <div className="flex items-center justify-between mt-3 bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold flex items-center justify-center active:scale-95 transition-all"
                          >
                            −
                          </button>
                          <span className="font-bold text-blue-700 text-lg">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(product.id)}
                            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold flex items-center justify-center active:scale-95 transition-all"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="mt-3 w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg text-sm active:scale-95 transition-all duration-150"
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
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">

                {/* Prev Button */}
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
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

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
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