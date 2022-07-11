import React from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css';

// displayed on the main component.
const NavBar = ({ isLoggedIn, setIsLoggedIn, setToken, setUser }) => {
  return (
    <div className="navbar-container">
      <div className="link-container">
        <Link to={"/"} className="nav-item">
          Home
        </Link>
        <Link to={"/routines"} className="nav-item">
          Routines
        </Link>
        <>
          {isLoggedIn ? (
            <Link to={"/myroutines"} className="nav-item">
              My Routines
            </Link>
          ) : null}
        </>
        <Link to={"/activities"} className="nav-item">
          Activities
        </Link>
        <>
          {isLoggedIn ? (
            <Link
              className="nav-item"
              // when clicked it logs you out and removes token from local storage
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.removeItem("token");
                setToken("");
                setUser({});
              }}
              to={"/"}
            >
              Logout
            </Link>
          ) : (
            <>
              <Link to={"/login"} className="nav-item">
                Login
              </Link>
              <Link to={"/register"} className="nav-item">
                Register
              </Link>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default NavBar;