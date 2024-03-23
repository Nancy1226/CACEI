import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

import pdf from "../../assets/pdf.svg";
import CloseUser from "./CloseUser";
import { useNavigate } from "react-router-dom";
import home from "../../assets/home.svg";


function Headers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
 
  const toggleClose = () => {
    setActive(!active);
  };

  const handleClick = () => {
    navigate("/dashboard");
  };

  const handleDownload = () => {
    const downloadUrl =
      "https://drive.google.com/file/d/1edHe-J5ReSxBECJLcXCOuqi32jwg1riZ/view?usp=drive_link"; 
    window.open(downloadUrl, "_blank");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white border-gray-200 border-b border-[#cccc]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
          <a
            onClick={handleClick}
            className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer"
          >
            <img src={logo} className="h-12" alt="Logo" onClick={handleClick} />
          </a>

          <motion.button
            onClick={toggleMenu}
            initial={{ scale: 1 }} 
            whileTap={{ scale: 0.95 }} 
            transition={{ duration: 0.3 }} 
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-white  ${
              isMenuOpen ? "bg-[#6541d0c9] text-white" : ""
            }`}
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </motion.button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
          >
            <ul className="font-medium gap-5 md:gap-0 flex flex-col items-center md:items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <section className="flex md:hidden flex-col justify-center items-center">
                <li>Docente:</li>
                <li>{localStorage.getItem("docente")}</li>
              </section>
              <li>
                <motion.button
                  onClick={handleDownload}
                  initial={{ scale: 1 }} 
                  whileTap={{ scale: 0.95 }} 
                  transition={{ duration: 0.3 }} 
                  className="md:bg-[#6541d0] md:hover:bg-[#6541d0c9] p-3 text-balck md:text-white font-bold px-4 rounded-full flex items-center gap-2"
                >
                  <img className=" bg-black md:bg-transparent" src={pdf} alt="pdf" />
                  Descargar rúbrica
                </motion.button>
              </li>

              <li>
                <div className="relative">

                <CloseUser onClick={toggleClose} active={active} />

                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Headers;
