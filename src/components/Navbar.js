import React from "react";
import logo from "../assest/logo.png";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <img className="h-14 w-14 object-contain" src={logo} alt="" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input type="text" className="w-full outline-none pl-2" />
          <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white hover:cursor-pointer">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-3xl">
            <FaRegCircleUser />
          </div>
          <div className="text-3xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 w-5 h-5 p-1 flex items-center justify-center text-white rounded-full absolute -top-2 -right-2">
              <p className="text-xs">0</p>
            </div>
          </div>
          <Link
            to={"/login"}
            className="px-3 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
