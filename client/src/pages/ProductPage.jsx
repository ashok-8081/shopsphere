import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Product not found...");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      }),
    );
    navigate("/cart");
  };

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
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
      >
        ← Go Back
      </button>

      <div className="bg-white rounded-lg shadow p-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg bg-gray-200 object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

            <p className="text-gray-500 text-sm">
              Brand: <span className="font-semibold">{product.brand}</span>
            </p>

            <p className="text-gray-600">{product.description}</p>

            <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>

            <p
              className={`font-semibold ${product.countInStock > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {product.countInStock > 0 && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Qty:
                </label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className="bg-yellow-400 text-gray-900 py-3 rounded font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
