import React from "react";
import "../../assets/styles/closeUser.css";

function CloseUser() {
  return (
    <>
        
      <div className="input relative bg-black">
        <div className=" bg-black   w-5 h-5 rounded-t-full absolute -top-2 right-3"></div>
        <button className="value">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              fill="#7D8590"
              d="M19.78 4.22a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 001.06 0l4.5-4.5a.75.75 0 011.06 0zM5 10.5h11.25a.75.75 0 010 1.5H5a.75.75 0 010-1.5z"
              clip-rule="evenodd"
            ></path>
            <path
              fill-rule="evenodd"
              fill="#7D8590"
              d="M5.75 13.5A.75.75 0 005 14.25h13.25a.75.75 0 100-1.5H5a.75.75 0 00.75.75zM11.75 17.5a.75.75 0 01-.75.75H5a.75.75 0 010-1.5h6a.75.75 0 01.75.75z"
              clip-rule="evenodd"
            ></path>
          </svg>
          
          Cerrar Sesion
        </button>
      </div>
    </>
  );
}

export default CloseUser;
