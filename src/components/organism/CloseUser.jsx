import React, { useState, useEffect } from "react";
import "../../assets/styles/closeUser.css";
import { logout } from "../../API/Route";
import { useNavigate } from "react-router-dom";
import usuario from "../../assets/usuario.png";
import door from '../../assets/door.svg'

function CloseUser({ onClick, active }) {
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

  const handleLogout = async () => {
    try {
      const response = await logout();
      localStorage.removeItem("docente");
      sessionStorage.removeItem("authenticated")
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          <button className="p-3 px-3 text-black rounded-full flex gap-2 items-center"> <img src={door} alt="" />cerrar sesion</button>
        </>
      ) : (
        <>
          <a
            onClick={onClick}
            className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer"
          >
            <img src={usuario} className="h-12" alt="Logo" />
            <span className="self-center text-base font-semibold whitespace-nowrap text-black">
              {localStorage.getItem("docente")}
            </span>
          </a>

          <div
            className={` absolute transition-all z-50 ease-in-out duration-200 top-0 md:top-16 ${
              active ? "right-0" : "hidden"
            }`}
          >
            <div className="input relative w-full md:mobile">
              <button className="value" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CloseUser;
