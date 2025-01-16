import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  HashRouter,  
} from "react-router-dom";

import Login from "../pages/Login";
import Books from "../pages/Books";
import Header from "./Header";
import Registration from "../pages/Registration";
import Home from "../pages/Home";

function WebPage() {
  return (
    <HashRouter>      
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />      
      </Routes>
    </HashRouter>
  );
}

export default WebPage;
