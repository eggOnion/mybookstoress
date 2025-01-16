import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthLink from "./AuthLink";
import JWTCounter from "./JWTCounter";

import "../styles/navbar.css";

function NavBar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScrollTop) {
      setShowNavbar(false); // Scroll down
    } else {
      setShowNavbar(true); // Scroll up
    }

    // Prevent negative scroll (e.g., during initial page load)
    setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
  };

  useEffect(() => {
    console.log('Navbar visibility:', showNavbar); // Log navbar visibility state
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, showNavbar]);

  return (
    <section className={`navbar ${showNavbar ? "visible" : "hidden"}`}>
      <nav className="my-navlink">
        <Link to="/home">Home</Link>
        <Link to="/books">Books</Link>
        <AuthLink />
        <Link to="/registration">Register</Link>
      </nav>
      <nav className="jwt-timer">
        <div className="jwt-timer-div">
          <JWTCounter />
        </div>
      </nav>
    </section>
  );
}

export default NavBar;
