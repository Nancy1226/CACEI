import usuario from '../../assets/usuario.png'
import logo from '../../assets/logouni.png'
import { useState, useEffect, useRef } from 'react';
import CloseUser from './CloseUser';
import { Link } from 'react-router-dom';

function Navbar() {
  const [active, setActive] = useState(false);
  const containerRef = useRef(null); 

  const toggleClose = () => {
    setActive(!active);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActive(false); 
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); 

  return (
    <>
    <div ref={containerRef}>
      <header className="  h-[65px] z-50 border-b border-[#cccc] duration-300 ease-in-out  p-4  bg-[#ffff] flex items-center justify-end   ">
        {/* Logo img */}
        <img
          src={logo}
          className="h-[65px] object-cover absolute top-0 left-0"
          alt="logo-image"
        />
        <div className="  flex  items-center  ">
          <div className=" h-[65px] border-dotted border-l border-[#494e6e] mx-5"></div>
          <button onClick={toggleClose} className="relative cursor-pointer">
            <img src={usuario} className="h-[40px] rounded-full" />
          </button>
        </div>
      </header>
      <div className={`absolute top-16 transition-all z-50 ease-in-out duration-200 ${active ? 'right-3': 'hidden'}`}>
        <Link to="/">
          <CloseUser/>
        </Link>
      </div>
    </div>

    </>
  );
}

export default Navbar;
