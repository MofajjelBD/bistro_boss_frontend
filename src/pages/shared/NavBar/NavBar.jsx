import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useCart from "../../../hooks/useCart/useCart";

const NavBar = () => {
  const { user, LogOut } = useContext(AuthContext);

  const handleLogOut = () => {
    LogOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const [cart] = useCart();

  const NavMenu = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li>
        <NavLink to="/order/salad">Order Food</NavLink>
      </li>
      <li>
        <NavLink to="/secret">Secret</NavLink>
      </li>
      <li>
        <NavLink className="btn rounded-full" to="dashboard/cart">
          {/* <button className="btn rounded-full"> */}
          Cart
          <div className="badge badge-secondary">+{cart.length}</div>
          {/* </button> */}
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar fixed z-10  bg-black/30 shadow-sm text-white max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {NavMenu}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavMenu}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <button onClick={handleLogOut} className="btn btn-ghost">
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
