import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosInstance.get("/orders/all");
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDeliver = async (orderId) => {
    try {
      await axiosInstance.put(`/orders/${orderId}/deliver`);
      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? { ...order, isDelivered: true, deliveredAt: Date.now() }
            : order,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Orders</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-gray-600">Order ID</th>
                <th className="text-left px-4 py-3 text-gray-600">User</th>
                <th className="text-left px-4 py-3 text-gray-600">Date</th>
                <th className="text-left px-4 py-3 text-gray-600">Total</th>
                <th className="text-left px-4 py-3 text-gray-600">Paid</th>
                <th className="text-left px-4 py-3 text-gray-600">Delivered</th>
                <th className="text-left px-4 py-3 text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/order/${order._id}`}
                      className="text-yellow-600 hover:underline"
                    >
                      {order._id.substring(0, 10)}...
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {order.user?.name || "Deleted User"}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    ₹{order.totalPrice}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {!order.isDelivered && order.isPaid && (
                      <button
                        onClick={() => handleDeliver(order._id)}
                        className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-300 transition-colors"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrdersPage;
