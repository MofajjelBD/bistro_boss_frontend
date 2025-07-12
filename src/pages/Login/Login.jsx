import React, { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const { SignIn, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.form?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    SignIn(email, password).then((result) => {
      const user = result.user;
      if (user) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      }
    });
  };

  const handleCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(3);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [user, navigate]);
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col md:flex-reverse ">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              excepturi deleniti odit, at voluptatem obcaecati totam cum
              dignissimos ab, vero tenetur nostrum, similique reprehenderit
              aliquam laudantium. Hic voluptas illo amet?
            </p>
          </div>
          <div className="card bg-base-100 lg:w-1/2 max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="from-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
              </div>
              <div className="from-control">
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
              </div>
              <div>
                <LoadCanvasTemplate />
              </div>
              <div className="join">
                <div className="w-full">
                  <label className="validator join-item">
                    <input
                      ref={captchaRef}
                      type="text"
                      name="captcha"
                      placeholder="Type captcha"
                      required
                      className="input outline-none focus:outline-hidden"
                    />
                  </label>
                  <div className="validator-hint hidden">
                    Please fill the captcha before submit
                  </div>
                </div>
                <button
                  onClick={handleCaptcha}
                  className="btn btn-neutral join-item"
                >
                  Validate
                </button>
              </div>
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <input
                disabled={disabled}
                className="btn btn-primary mt-4"
                type="submit"
                value="Login"
              />
            </form>
            <p className="card-body py-0 pb-2">
              <small>
                Hew here <Link to="/signup">Create an New Account</Link>
              </small>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
