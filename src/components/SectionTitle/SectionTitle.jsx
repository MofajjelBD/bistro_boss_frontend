import React from "react";

const SectionTitle = ({ subHeading, heading }) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-4">
      <p className="text-yellow-600 mb-4">---{subHeading}---</p>
      <h3 className="text-4xl uppercase border-y-4 border-indigo-200 py-4">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
