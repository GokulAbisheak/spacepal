import React from "react";
import { Link, useNavigate } from "react-router-dom";
import spaceLogo from "../../assets/space-white.png";

const Header = () => {
  const history = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    history("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Asteroids Near Me", path: "/asteroids-near-me" },
    { name: "Software Patents", path: "/patents/software" },
    { name: "Engine Patents", path: "/patents/engine" },
    { name: "Mars Rover Photos", path: "/mars-rover-photos" },
    { name: "Earth Imagery", path: "/earth-imagery" },
  ];

  return (
    <div className="h-20 w-full bg-black flex items-center justify-between px-5 absolute top-0 z-[100]">
      <div className="text-2xl text-white font-bold flex gap-1 uppercase">
        <img className="h-10 w-auto" src={spaceLogo} alt="SpacePal Logo" />
        SpacePal
      </div>
      <div className="text-white font-semibold flex gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            className="hover:scale-110 duration-200"
            to={link.path}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="text-white font-semibold flex gap-5">
        {user ? (
          <button
            onClick={handleLogout}
            className="hover:scale-110 duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link className="hover:scale-110 duration-200" to="/login">
              Login
            </Link>
            <Link className="hover:scale-110 duration-200" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
