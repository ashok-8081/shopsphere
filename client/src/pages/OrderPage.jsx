import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from '../utils/axiosInstance'

const OrderPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    console.log("Order ID from URL:", id);
    const fetchOrder = async () => {
      try {
        const { data } = await axiosInstance.get(`/orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Order not found");
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Details</h1>
      <p className="text-gray-500 text-sm mb-8">Order ID: {order._id}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Shipping Address
            </h2>
            <p className="text-gray-600">{order.shippingAddress.address}</p>
            <p className="text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p className="text-gray-600">{order.shippingAddress.postalCode}</p>
            <p
              className={`mt-3 font-semibold ${order.isDelivered ? "text-green-500" : "text-red-500"}`}
            >
              {order.isDelivered
                ? `Delivered on ${order.deliveredAt}`
                : "Not Delivered Yet"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Payment Status
            </h2>
            <p className="text-gray-600">Method: {order.paymentMethod}</p>
            <p
              className={`mt-3 font-semibold ${order.isPaid ? "text-green-500" : "text-red-500"}`}
            >
              {order.isPaid
                ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}`
                : "Not Paid"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Order Items
            </h2>
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded bg-gray-200"
                />
                <Link
                  to={`/product/${item.product}`}
                  className="flex-1 text-gray-800 hover:text-yellow-600 font-semibold"
                >
                  {item.name}
                </Link>
                <p className="text-gray-600">
                  {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Items:</span>
            <span>₹{order.itemsPrice}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping:</span>
            <span>
              {order.shippingPrice === 0 ? "FREE" : `₹${order.shippingPrice}`}
            </span>
          </div>

          <div className="flex justify-between mb-6 font-bold text-lg border-t pt-4">
            <span>Total:</span>
            <span>₹{order.totalPrice}</span>
          </div>

          <div
            className={`text-center py-2 rounded font-semibold ${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {order.isPaid ? "✓ Payment Complete" : "✗ Payment Pending"}
          </div>

          <Link
            to="/"
            className="block text-center mt-4 bg-yellow-400 text-gray-900 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
