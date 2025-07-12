import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu`,
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/dashboard/manageItems");
      }
    }

    console.log(res.data);
  };
  return (
    <div>
      <SectionTitle
        heading="add an item"
        subHeading="What's new?"
      ></SectionTitle>
      <div className="mx-auto bg-slate-100 max-w-8/10 lg:p-8 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label htmlFor="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex gap-6">
            <div className="form-control w-full">
              <label htmlFor="label">
                <span className="label-text">Recipe Category</span>
              </label>
              <select
                defaultValue="Select a category"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled>Select a category</option>
                <option value="salad">salad</option>
                <option value="pizza">pizza</option>
                <option value="soup">soup</option>
                <option value="dessert">dessert</option>
                <option value="drinks">drinks</option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
            <div className="form-control w-full">
              <label htmlFor="label">
                <span className="label-text">Recipe Price</span>
              </label>
              <input
                type="number"
                placeholder="Recipe Name"
                className="input input-bordered  w-full"
                {...register("price", { required: true })}
              />
            </div>
          </div>
          <div className="form-control w-full my-6">
            <label htmlFor="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipe")}
              placeholder="Bio"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-ghost"
            />
          </div>
          <button className="btn">
            Add Item <FaUtensils className=""></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
