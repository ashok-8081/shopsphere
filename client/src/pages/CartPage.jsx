import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

const CartPage = () => {
  const { cartItems, totalItems, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQtyChange = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  const handleCheckout = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0)
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="bg-gray-100 min-h-screen flex flex-col justify-center items-center gap-4">
          Your cart is empty
        </p>
        <Link
          to="/"
          className="bg-yellow-400 text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 flex gap-4 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded bg-gray-200"
              />

              <div className="flex-1">
                <Link
                  to={`/product/${item._id}`}
                  className="text-lg font-semibold text-gray-800 hover:text-yellow-600"
                >
                  {item.name}
                </Link>
                <p className="text-gray-500 text-sm">₹{item.price}</p>
              </div>

              <select
                value={item.qty}
                onChange={(e) => handleQtyChange(item, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-yellow-400"
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

              <p className="font-bold text-gray-900 w-24 text-right">
                ₹{item.price * item.qty}
              </p>

              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 hover:text-red-700 font-bold text-xl transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Items:</span>
            <span className="font-semibold">{totalItems}</span>
          </div>

          <div className="flex justify-between mb-6">
            <span className="text-gray-600">Total Price:</span>
            <span className="font-bold text-xl">₹{totalPrice}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-yellow-400 text-gray-900 py-3 rounded font-semibold hover:bg-yellow-300 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
