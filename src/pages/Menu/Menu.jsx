import React from "react";
// import { Helmet } from "react-helmet-async";
import Cover from "../shared/Cover/Cover";
import ImgMenu from "../../assets/menu/banner3.jpg";
import ImgDessert from "../../assets/menu/dessert-bg.jpeg";
import ImgPizza from "../../assets/menu/pizza-bg.jpg";
import ImgSalad from "../../assets/menu/salad-bg.jpg";
import ImgSoup from "../../assets/menu/soup-bg.jpg";
import useMenu from "../../hooks/useMenu/useMenu";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";
const Menu = () => {
  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");

  return (
    <>
      {/* <Helmet>
        <title>Our Menu</title>
      </Helmet> */}
      <Cover
        img={ImgMenu}
        title="OUR MENU"
        description="Would you like to try a dish?"
      ></Cover>
      <SectionTitle
        subHeading={"From 11:00am to 10:00pm"}
        heading={"ORDER ONLINE"}
      ></SectionTitle>
      <MenuCategory items={offered} title={""} img={""}></MenuCategory>

      <MenuCategory
        items={dessert}
        title="dessert"
        img={ImgDessert}
      ></MenuCategory>

      <MenuCategory items={pizza} title="pizza" img={ImgPizza}></MenuCategory>

      <MenuCategory items={salad} title="salad" img={ImgSalad}></MenuCategory>

      <MenuCategory items={soup} title="soup" img={ImgSoup}></MenuCategory>
    </>
  );
};

export default Menu;
