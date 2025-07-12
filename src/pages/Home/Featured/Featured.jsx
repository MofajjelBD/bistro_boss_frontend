import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Feature from "../../../../src/assets/home/featured.jpg";

const Featured = () => {
  return (
    <div
      className="text-white my-20 pt-8 bg-fixed"
      style={{ backgroundImage: `url(${Feature})` }}
    >
      <SectionTitle
        subHeading={"Check it item"}
        heading={"ORDER ONLINE"}
      ></SectionTitle>
      <div className="md:flex justify-center items-center pb-20 pt-12 px-36 bg-slate-500 opacity-40">
        <div>
          <img src={Feature} alt="" />
        </div>
        <div className="md:ml-10">
          <p className="uppercase">Aug 20, 2029</p>
          <p>Where can I get some?</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
            assumenda officiis neque, inventore perspiciatis quia aliquid quam.
            Doloribus earum dolorem eos aperiam autem, vero ex cumque eveniet
            nisi animi veniam?
          </p>
          <button className="btn btn-outline border-0 border-b-4 hover:bg-transparent">
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
