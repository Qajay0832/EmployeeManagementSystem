import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import brand from "../../assests/brandIcon.png";

const Navbar = () => {
  return (
    <nav className="navContainer">
      <div className="brandContainer">
        <img className="brandIcon" src={brand} />
        <div className="brandName">EMS</div>
      </div>

      <div className="navLinks">
        <Link className="navLink" to={"/"}>
          Employee Directory
        </Link>
        <Link className="navLink" to={"/createuser"}>
          Create
        </Link>
      </div>
      <div>
        <button className="navLink">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
