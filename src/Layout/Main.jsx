import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/shared/Footer/Footer";
import NavBar from "../pages/shared/NavBar/NavBar";

const Main = () => {
  const location = useLocation();
  const NoHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div>
      {NoHeaderFooter || <NavBar></NavBar>}
      <Outlet></Outlet>
      {NoHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
