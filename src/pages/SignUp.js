import React, { useState } from "react";
import userIcon from "../assest/usericon.png";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((error) => console.log("Fetch error:", error));
      const dataApi = await dataResponse.json();
      console.log("data", dataApi);
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else {
        toast.error(dataApi.message);
      }
    } else {
      console.log("please check confirm password");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };
  return (
    <section id="login">
      <div>
        <div className="bg-white shadow-md px-4 py-6 w-full max-w-md mx-auto rounded-md m-auto">
          <div className="w-28 h-28 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || userIcon} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="cursor-pointer text-xs bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full bg-opacity-75 ">
                  upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form
            action=""
            className="mt-4 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div>
              <label>Name: </label>
              <div className="bg-slate-200 p-2 rounded-md">
                <input
                  type="text"
                  name="name"
                  value={data.username}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter your Name"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Email: </label>
              <div className="bg-slate-200 p-2 rounded-md">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password: </label>
              <div className="bg-slate-200 p-2 flex items-center justify-between rounded-md">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={data.target}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer text-2xl"
                >
                  <span>{showPassword ? <IoEyeSharp /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password: </label>
              <div className="bg-slate-200 p-2 flex items-center justify-between rounded-md">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  className="w-full h-full outline-none bg-transparent"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                />
                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="cursor-pointer text-2xl"
                >
                  <span>
                    {showConfirmPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:outline-none rounded-lg px-5 py-2.5 text-center text-sm mt-8">
              Sign Up
            </button>
          </form>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center mt-2">
            Do you already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline hover:text-black"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
