import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLink from "./AuthLink";
import JWTCounter from "./JWTCounter";
import NavBar from "./NavBar";

function Header() {
  return (
    <header>
      <section>
        <NavBar />
      </section>
    </header>
  );
}

export default Header;
