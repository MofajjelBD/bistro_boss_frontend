import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const menu = useLoaderData();
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
      const menuRes = await axiosSecure.patch(`/menu/${menu._id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the menu`,
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/dashboard/manageItems");
      }
    }
  };
  return (
    <div>
      <SectionTitle
        heading="Update Item"
        subHeading="Update here"
      ></SectionTitle>
      <div className="mx-auto bg-slate-100 max-w-8/10 lg:p-8 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label htmlFor="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
              defaultValue={menu.name}
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
                defaultValue={menu.category}
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
                defaultValue={parseInt(menu.price)}
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
              defaultValue={menu.recipe}
              {...register("recipe")}
              placeholder="Bio"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <div className="form-control w-full my-6">
            <input
              {...register("image")}
              type="file"
              className="file-input file-input-ghost"
            />
          </div>
          <button className="btn bg-amber-200">
            Update Item <FaUtensils className=""></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
