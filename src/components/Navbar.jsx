import React, { useState } from "react";
import { logo } from "../assets";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);

  const closeMenu = () => {
    setToggle(false);
    navigate("/home");
  }

  const navigate = useNavigate();

  const navigateCloseMenu = (path) => {
    navigate(path);
    setToggle(false);
  };

  return (
    <div className="sticky top-0 w-full h-[80px] z-50 animated-background bg-gradient-to-r from-[#6363EF] via-[#6363EF] to-indigo-600">
      <div className="md:max-w-[1400px] max-w-[520px] m-auto w-full h-full flex items-center justify-between px-6 md:px-2">

        <div className="justify-center items-center">
          <button onClick={() => navigate("/")}>
            <img src={logo} className="h-[35px] cursor-pointer" />
          </button>
        </div>

        <div className="hidden md:flex w-full pr justify-center items-center">
          <div className="flex justify-center gap-8 text-white">
            <button 
              onClick={closeMenu} 
              className="hover:text-gray-200 active:text-gray-300 text-lg focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-gray-200 active:text-gray-300 text-lg focus:outline-none"
            >
              Relatórios
            </button>
            {/* <button className="hover:text-gray-100 active:text-gray-300 focus:outline-none">
              <Link to="benefits" duration={500} smooth={true}>
                Calendário
              </Link>
            </button> */}
            {/* <button className="hover:text-gray-100 active:text-gray-300 focus:outline-none">
              <Link to="faq" duration={800} smooth={true}>
                Dúvidas
              </Link>
            </button> */}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <h3 className="text-center text-white">Olá, Cliente</h3>
          <BsPersonCircle className="w-12 h-12 text-white"/>

        </div>

        {/* <div className="hidden md:flex">
          <button
            onClick={() => navigate("/login")}
            className="flex justify-between items-center px-6 gap-2 text-white hover:text-gray-200 active:text-gray-300 focus:outline-none"
          >
            Entrar
          </button>
          <button className="px-8 py-3 rounded-md bg-white text-brite font-bold border border-brite-active hover:border-transparent focus:outline-none focus:ring-2 active:bg-gray-100">
            Teste de Graça
          </button>
        </div> */}

        <div className="md:hidden" onClick={handleClick}>
          {toggle ? (
            <RxCross2 style={{ color: "white" }} size={30} />
          ) : (
            <RxHamburgerMenu style={{ color: "white" }} size={30} />
          )}
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 w-full animated-background bg-gradient-to-r from-[#6363EF] via-[#6363EF] to-indigo-600 md:hidden border-b-2 border-t-2 border-indigo-500"
            : "hidden"
        }
      >
        <div className="flex flex-col items-center justify-center gap-4 p-6">
          <button 
            className="py-3 text-lg text-white hover:text-gray-200 active:text-gray-300 w-full focus:outline-none"
            onClick={closeMenu}
          >
            Home
          </button>
          <button
            onClick={() => navigateCloseMenu("/dashboard")}
            className="w-full py-3 text-lg text-white hover:text-gray-200 active:text-gray-300 hover:bg-brite-hover focus:outline-none"
          >
            Relatórios 
          </button>
          {/* <button className="flex w-full p-3 text-white hover:text-gray-200 active:text-gray-300 hover:bg-brite-hover focus:outline-none">
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
          </button> */}

          {/* <div className="flex flex-col my-3 gap-3">
            <button
              onClick={() => navigate("/login")}
              className=" flex justify-center items-center px-6 gap-2 text-white py-3 border border-white focus:outline-none focus:ring-2 active:border-gray-300"
            >
              Entrar
            </button>
            <button className="px-8 py-4 rounded-md bg-white text-brite font-bold border border-brite-active hover:border-transparent focus:outline-none focus:ring-2 active:bg-gray-100">
              Teste de Graça
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
