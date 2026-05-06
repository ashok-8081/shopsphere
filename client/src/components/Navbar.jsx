import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-yellow-400">
        ShopSphere
      </Link>
      <div className="flex gap-6 items-center">
        <Link
          to="/cart"
          className="hover:text-yellow-400 transition-colors relative"
        >
          Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-yellow-400 text-gray-900 text-xs rounded-full w-5 h-5 flex justify-center items-center font-bold">
              {cartItems.length}
            </span>
          )}
        </Link>
        {userInfo ? (
          <div className="flex gap-4 items-center">
            <span className="text-yellow-400 font-semibold">
              Hi, {userInfo.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
