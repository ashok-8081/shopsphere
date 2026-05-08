import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { clearCart } from "../redux/slices/cartSlice";
import useRazorpay from "../hooks/useRazorpay";

function CheckoutPage() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const orderIdRef = useRef(null);

  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadRazorpay } = useRazorpay();

  const shippingPrice = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + shippingPrice;

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      // Step 1 — Create order in our database
      const { data: order } = await axiosInstance.post("/orders", {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product || item._id,
        })),
        shippingAddress: { address, city, postalCode, state },
        paymentMethod: "Razorpay",
        itemsPrice: totalPrice,
        shippingPrice,
        totalPrice: finalTotal,
      });
      orderIdRef.current = order._id;


      // Step 2 — Create Razorpay order
      const { data: razorpayData } = await axiosInstance.post(
        "/payment/create-order",
        { orderId: order._id },
      );

      // Step 3 — Load Razorpay script
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        setError("Razorpay failed to load. Check your connection.");
        setLoading(false);
        return;
      }

      // Step 4 — Open Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        name: "ShopSphere",
        description: "Order Payment",
        order_id: razorpayData.razorpayOrderId,
        handler: async (response) => {
          try {
            // Step 5 — Verify payment
            await axiosInstance.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            });
            console.log("Order ID:", order._id);
            dispatch(clearCart());
            navigate(`/order/${orderIdRef.current}`);
          } catch (error) {
            setError("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        theme: {
          color: "#FBBF24",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Shipping Address
          </h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
                placeholder="Enter street address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
                placeholder="Enter postal code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
                placeholder="Enter state"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">
                {item.name} x {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Items:</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping:</span>
            <span className={shippingPrice === 0 ? "text-green-500" : ""}>
              {shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}
            </span>
          </div>

          <div className="flex justify-between mb-6 font-bold text-lg">
            <span>Total:</span>
            <span>₹{finalTotal}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading || !address || !city || !postalCode || !state}
            className="w-full bg-yellow-400 text-gray-900 py-3 rounded font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          <p className="text-xs text-gray-500 mt-2 text-center">
            {shippingPrice === 0
              ? "🎉 You got free shipping!"
              : `Add ₹${500 - totalPrice} more for free shipping`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
