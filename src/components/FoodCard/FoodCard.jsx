import React from "react";
import {} from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useCart from "../../hooks/useCart/useCart";

const FoodCard = ({ item }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const { name, image, price, recipe, _id } = item;
  const handleAddToCart = (food) => {
    if (user && user.email) {
      const cartItem = {
        menuID: food._id,
        name: food.name,
        image: food.image,
        price: food.price,
        email: user?.email,
      };
      axiosSecure
        .post("/carts", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} added to the cart`,
              showConfirmButton: false,
              timer: 700,
            });
            // refetch the cart
            refetch();
          }
        })
        .catch((error) => {
          console.error("Add to cart failed", error);
        });
    } else {
      Swal.fire({
        title: "Are you login?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { form: location } });
        }
      });
    }
  };
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4">
          ${price}
        </p>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-center">
            <button
              onClick={() => handleAddToCart(item)}
              className="btn btn-outline border-0 border-b-4 hover:bg-slate-300 bg-slate-100 "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
