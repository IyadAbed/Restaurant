/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { SiCircle } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { ImBooks } from "react-icons/im";
import { TfiQuoteRight } from "react-icons/tfi";
import { FcAbout } from "react-icons/fc";

export const Aside = () => {
  return (
    <aside
      id="drawer-navigation"
      className="fixed top-0 z-50 w-60  h-screen  transition-transform -translate-x-full  md:translate-x-0"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-[#396c84] ">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <SiCircle />
              <span className="mr-3">overview</span>
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <ImBooks />
              Projects{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/quotes"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <TfiQuoteRight />
              Users{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black"
            >
              <FcAbout />
              About Us
            </Link>
          </li>
          <a href="/###">
            <span className="flex  items-center gap-2 p-2  w-full text-base font-medium text-white rounded-lg transition duration-75 group hover:bg-[#fff] hover:text-black">
              <FiLogOut />
              Logout
            </span>
          </a>
        </ul>
      </div>
    </aside>
  );
};
