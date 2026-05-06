import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("/products");
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4 bg-gray-200"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {product.name}
            </h2>
            <p className="text-gray-500 text-sm mb-3 flex-1">
              {product.description}
            </p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              <Link
                to={`/product/${product._id}`}
                className="bg-yellow-400 text-gray-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
