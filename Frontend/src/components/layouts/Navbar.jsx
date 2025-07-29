import React, { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
    <div className={`flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>

      <button
        className="block lg:hidden text-black"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <div className="flex items-center justify-center gap-4 my-1">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[50px] h-[50px] object-contain"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          Expense Management System
        </h2>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
