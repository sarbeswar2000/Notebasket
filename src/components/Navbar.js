import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const handleOnLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Notebasket
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/Home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/Home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
              {!localStorage.getItem("token") ?(
                <form className="d-flex">
                  <Link className="btn btn-primary mx-2" to="/login" role="button">
                    Login
                  </Link>
                  <Link className="btn btn-primary mx-2" to="/signup" role="button">
                    Signup
                  </Link>
                </form>
              ) : (
                <button className="btn btn-primary mx-2" onClick={handleOnLogout}>
                  Logout
                </button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
