import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { CreateUser, updateProfileUser, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.form?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    CreateUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateProfileUser(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              console.log(`"good and health" ${res.data.insertedId}`);
              Swal.fire({
                title: "Create account successful",
                showClass: {
                  popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
                },
                hideClass: {
                  popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
                },
              });
              navigate(from, { replace: true });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
      navigate(from, { replace: true });
    });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-5xl font-bold">Signup now!</h1>
            <p className="py-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              excepturi deleniti odit, at voluptatem obcaecati totam cum
              dignissimos ab, vero tenetur nostrum, similique reprehenderit
              aliquam laudantium. Hic voluptas illo amet?
            </p>
          </div>
          <div className="card bg-base-100 lg:w-1/2 max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="from-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Your name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="from-control">
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  className="input"
                  placeholder="PhotoURL"
                  {...register("photoURL", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">Photo URLis required</span>
                )}
              </div>
              <div className="from-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="from-control">
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=^.*[!@#$&])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500">Must be 6</span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-500">More than 20</span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500">
                    Password must have one uppercase one lowercase one number
                    and one symbolic key
                  </span>
                )}
              </div>
              <div></div>
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <input
                className="btn btn-primary mt-4"
                type="submit"
                value="Sing Up"
              />
            </form>
            <p className="card-body py-0">
              <small>
                You Have a account <Link to="/login">Sign In</Link>
              </small>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
