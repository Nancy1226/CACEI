import usuario from "../../assets/usuario.png";
import logo from "../../assets/logouni.png";
import pdf from '../../assets/pdf.svg'
import { useState, useEffect, useRef } from "react";
import CloseUser from "./CloseUser";
import { Link } from "react-router-dom";
import home from "../../assets/home.svg";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  const handleDownload = () => {
    
    const downloadUrl = 'https://drive.google.com/file/d/1edHe-J5ReSxBECJLcXCOuqi32jwg1riZ/view?usp=drive_link'; // URL modificada para permitir la descarga directa
    window.open(downloadUrl, '_blank');
  }

  const toggleClose = () => {
    setActive(!active);
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
      <div ref={containerRef}>
        <header className="  h-[65px] z-50 border-b border-[#cccc] duration-300 ease-in-out  p-4  bg-[#ffff] flex items-center justify-end   ">
          
          <img
            src={logo}
            className="h-[65px] object-cover absolute top-0 left-0"
            alt="logo-image"
          />
          <div className="flex flex-row gap-6 items-center">
            <button onClick={handleDownload} className="bg-[#6541d0] hover:bg-[#6541d0c9] p-3 text-white font-bold px-4 rounded-full flex items-center gap-2">
              <img src={pdf} alt="pdf" />
              Descargar rúbrica
            </button>

            <button className="flex flex-col hover:text-[#662481]" onClick={handleClick}>
              <img src={home} className="h-10 " />
              Home
            </button>
          </div>

          <div className="  flex  items-center  ">
            <div className=" h-[65px] border-dotted border-l border-[#494e6e] mx-5"></div>
            <button onClick={toggleClose} className="relative cursor-pointer">
              <img src={usuario} className="h-[40px] rounded-full" />
            </button>
          </div>

          <div className="px-3">{localStorage.getItem("docente")}</div>
        </header>

        <div
          className={`absolute top-16 transition-all z-50 ease-in-out duration-200 ${
            active ? "right-3" : "hidden"
          }`}
        >
          <CloseUser />
        </div>
      </div>
    </>
  );
}

export default Navbar;
