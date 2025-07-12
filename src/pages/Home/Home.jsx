import React from "react";
// import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import PopularMenu from "./PopularMenu/PopularMenu";
import Featured from "./Featured/Featured";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      {/* <Helmet>
        <title>-Bistro Boss Restaurant</title>
      </Helmet> */}
      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </>
  );
};

export default Home;
