import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    const confirm = window.confirm("Are you sure you want to clear the cart?");
    if (confirm) {
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            {cartItems.length > 0 && "Your Cart 🛒"}
          </h1>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center gap-1 md:gap-2 bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-xs md:text-sm active:scale-95 transition-all duration-150"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (

          /* ── Empty Cart ── */
          <div className="flex flex-col items-center justify-center mt-16 md:mt-20 gap-4">
            <img
              src="https://res.cloudinary.com/dal1ft5go/image/upload/f_auto,q_auto/1774372813300_qpyxhd"
              alt="Empty Cart"
              className="w-52 h-52 md:w-80 md:h-80 object-cover rounded-lg"
            />
            <p className="text-base md:text-xl font-semibold text-gray-500">
              Your cart is empty!
            </p>
            <p className="text-gray-400 text-sm">
              Add some products to your cart
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-semibold px-10 py-3 md:py-4 rounded-full shadow-xl active:scale-95 transition-all duration-200 w-full md:w-auto"
            >
              Shop Now
            </button>
          </div>

        ) : (
          <>
            {/* ── Cart Items ── */}
            <div className="flex flex-col gap-3 md:gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-3 md:p-4 flex items-center gap-3 md:gap-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-gray-800 text-xs md:text-sm line-clamp-2 md:line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-blue-600 font-bold text-sm md:text-base mt-0.5">
                      ${item.price}
                    </p>
                    {/* Item total — shown below price on mobile */}
                    <p className="text-gray-500 text-xs mt-0.5 md:hidden">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-base md:text-lg font-bold flex items-center justify-center active:scale-95 transition-all"
                    >
                      −
                    </button>
                    <span className="w-5 md:w-6 text-center font-semibold text-sm md:text-base">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-base md:text-lg font-bold flex items-center justify-center active:scale-95 transition-all"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total — hidden on mobile, shown on laptop */}
                  <p className="hidden md:block text-gray-700 font-semibold w-16 text-right text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-lg md:text-xl ml-1 md:ml-2 flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ── Total & Checkout ── */}
            <div className="bg-white rounded-xl shadow p-4 md:p-6 mt-4 md:mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm md:text-base">Total Items:</span>
                <span className="font-semibold text-sm md:text-base">
                  {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <span className="text-base md:text-xl font-bold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white text-base md:text-lg font-semibold py-3 rounded-xl active:scale-95 transition-all duration-150">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;