import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaAd,
  FaHistory,
  FaHome,
  FaShoppingCart,
  FaUser,
  FaUtensilSpoon,
} from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin/useAdmin";
import useCart from "../../hooks/useCart/useCart";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu text-base-content w-full p-4">
          {isAdmin ? (
            <>
              <li className="">
                <NavLink
                  to="/dashboard/adminHome"
                  className={({ isActive }) => [
                    isActive ? "bg-red-600 text-white" : "",
                  ]}
                >
                  <FaHome></FaHome>Admin Home
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/dashboard/addItems"
                  className={({ isActive }) => [
                    isActive ? "bg-red-600 text-white" : "",
                  ]}
                >
                  <FaUtensilSpoon></FaUtensilSpoon>
                  Add Items
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/dashboard/cart"
                  className={({ isActive }) => [
                    isActive ? "bg-red-600 text-white" : "",
                  ]}
                >
                  <FaShoppingCart></FaShoppingCart> My cart ({cart.length})
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/dashboard/manageItems"
                  className={({ isActive }) => [
                    isActive ? "bg-red-600 text-white" : "",
                  ]}
                >
                  <FaAd></FaAd>Manage Items
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) => [
                    isActive ? "bg-red-600 text-white" : "",
                  ]}
                >
                  <FaHistory></FaHistory>Payment History
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/dashboard/booking"
                  className={({ isActive }) => [
                    isActive ? "bg-red-600 text-white" : "",
                  ]}
                >
                  <FaUser></FaUser> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="">
                <NavLink
                  to="/dashboard/userHome"
                  className={({ isActive }) => [
                    isActive ? "bg-red-600 text-white" : "",
                  ]}
                >
                  <FaHome></FaHome>Admin Home
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) => [
                    isActive ? "bg-red-600 text-white" : "",
                  ]}
                >
                  <FaHistory></FaHistory>Payment History
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="/dashboard/cart"
                  className={({ isActive }) => [
                    isActive ? "bg-red-600 text-white" : "",
                  ]}
                >
                  <FaShoppingCart></FaShoppingCart> My cart ({cart.length})
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li className="">
            <NavLink
              to="/"
              className={({ isActive }) => [
                isActive ? "bg-red-600 text-white" : "",
              ]}
            >
              <FaHome></FaHome> Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
