import React from "react";
// Icons
import { RiSearch2Line } from "react-icons/ri";
// import { useSelector } from "react-redux";

const Header = () => {
  // const user = useSelector((state) => state.login.user);
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-gray-200">
      <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">
       Dashboard <span className="text-blue-600"></span>
      </h1>
      {/* <form className="w-full md:w-auto">
        <div className="relative">
        
          <input
            type="text"
            className="bg-gray-200 outline-none py-2 pl-8 pr-4 rounded-xl w-full md:w-auto"
            placeholder="Search for projects"
          />
        </div>
      </form> */}
    </header>
  );
};

export default Header;
