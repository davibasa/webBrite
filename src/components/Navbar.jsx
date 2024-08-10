import React, { useState } from "react";
import { logo } from "../assets";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);
  const closeMenu = () => setToggle(false);
  const navigate = useNavigate();

  const navigateCloseMenu = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <div className="sticky top-0 w-full h-[80px] z-50 animated-background bg-gradient-to-r from-[#6363EF] via-[#6363EF] to-indigo-500">
      <div className="md:max-w-[1400px] max-w-[520px] m-auto w-full h-full flex justify-between items-center md:px-4 px-4">
        <div className="flex-1 flex justify-center items-center">
          <button onClick={() => navigate("/")}>
            <img src={logo} className="h-[45px] cursor-pointer" />
          </button>
        </div>
        {/* <div className="hidden w-40 md:flex items-center">
          <div className="flex gap-8 text-white">
            <button className="hover:text-gray-100 active:text-gray-300 focus:outline-none">
              <Link to="hero" duration={500} smooth={true} onClick={closeMenu}>
                Home
              </Link>
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="hover:text-gray-100 active:text-gray-300 focus:outline-none"
            >
              Preços
            </button>
            <button className="hover:text-gray-100 active:text-gray-300 focus:outline-none">
              <Link to="benefits" duration={500} smooth={true}>
                Recursos
              </Link>
            </button>
            <button className="hover:text-gray-100 active:text-gray-300 focus:outline-none">
              <Link to="faq" duration={800} smooth={true}>
                Dúvidas
              </Link>
            </button>
          </div>
        </div>

        <div className="hidden md:flex">
          <button
            onClick={() => navigate("/login")}
            className="flex justify-between items-center px-6 gap-2 text-white hover:text-gray-200 active:text-gray-300 focus:outline-none"
          >
            Entrar
          </button>
          <button className="px-8 py-3 rounded-md bg-white text-brite font-bold border border-brite-active hover:border-transparent focus:outline-none focus:ring-2 active:bg-gray-100">
            Teste de Graça
          </button>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          {toggle ? (
            <RxCross2 style={{ color: "white" }} size={25} />
          ) : (
            <RxHamburgerMenu style={{ color: "white" }} size={25} />
          )}
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4 bg-brite w-full px-8 md:hidden border-b"
            : "hidden"
        }
      >
        <div className="">
          <button className="flex w-full p-3 text-white hover:text-gray-200 active:text-gray-300 hover:bg-brite-hover focus:outline-none">
            <Link to="hero" duration={500} smooth={true} onClick={closeMenu}>
              Home
            </Link>
          </button>
          <button
            onClick={() => navigateCloseMenu("/pricing")}
            className="flex w-full p-3 text-white hover:text-gray-200 active:text-gray-300 hover:bg-brite-hover focus:outline-none"
          >
            Preços
          </button>
          <button className="flex w-full p-3 text-white hover:text-gray-200 active:text-gray-300 hover:bg-brite-hover focus:outline-none">
            <Link
              to="benefits"
              duration={650}
              smooth={true}
              onClick={closeMenu}
            >
              Recursos
            </Link>
          </button>
          <button className="flex w-full p-3 text-white hover:text-gray-200 active:text-gray-300 hover:bg-brite-hover focus:outline-none">
            <Link to="faq" duration={800} smooth={true} onClick={closeMenu}>
              Dúvidas
            </Link>
          </button>
          <div className="flex flex-col my-3 gap-3">
            <button
              onClick={() => navigate("/login")}
              className=" flex justify-center items-center px-6 gap-2 text-white py-3 border border-white focus:outline-none focus:ring-2 active:border-gray-300"
            >
              Entrar
            </button>
            <button className="px-8 py-4 rounded-md bg-white text-brite font-bold border border-brite-active hover:border-transparent focus:outline-none focus:ring-2 active:bg-gray-100">
              Teste de Graça
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
