import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand">
          Navbar
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                Users List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/createuser"}>
                Create User
              </Link>
            </li>
          </ul>
          <button className="logoutBtn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
