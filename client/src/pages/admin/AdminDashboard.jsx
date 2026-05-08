import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, productRes] = await Promise.all([
          axiosInstance.get("/orders/all"),
          axiosInstance.get("/products"),
        ]);

        setOrders(orderRes.data);
        setProducts(productRes.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders
    .filter((order) => order.isPaid)
    .reduce((acc, order) => acc + order.totalPrice, 0);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">₹{totalRevenue}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-yellow-600 text-sm font-semibold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-gray-600">Order ID</th>
                  <th className="text-left py-2 text-gray-600">Total</th>
                  <th className="text-left py-2 text-gray-600">Paid</th>
                  <th className="text-left py-2 text-gray-600">Delivered</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-2">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-yellow-600 hover:underline"
                      >
                        {order._id.substring(0, 10)}...
                      </Link>
                    </td>
                    <td className="py-2">₹{order.totalPrice}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Products</h2>
            <Link
              to="/admin/products"
              className="text-yellow-600 text-sm font-semibold hover:underline"
            >
              Manage Products
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-gray-600">Name</th>
                  <th className="text-left py-2 text-gray-600">Price</th>
                  <th className="text-left py-2 text-gray-600">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 font-semibold text-gray-800">
                      {product.name}
                    </td>
                    <td className="py-2">₹{product.price}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${product.countInStock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {product.countInStock > 0
                          ? product.countInStock
                          : "Out of stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
