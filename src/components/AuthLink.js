import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import LogoutConfirmationModal from "./LogoutConfirmationModal"; 

function AuthLink() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {    
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false); 
    setShowModal(false); 
    navigate("/login");
    localStorage.setItem("username", "");
  };
  
  const handleLoginClick = () => {
    navigate("/login");
  };
  
  const handleLogoutClick = () => {
    setShowModal(true); 
  };

  return (
    <div style={{ paddingTop: "9px" }}>
      {isLoggedIn ? (
        <>
          <Link to="#" onClick={handleLogoutClick}>
            Logout
          </Link>
          {showModal && (
            <LogoutConfirmationModal
              onConfirm={handleLogout}
              onCancel={() => setShowModal(false)}
            />
          )}
        </>
      ) : (
        <Link to="/login" onClick={handleLoginClick}>
          Login
        </Link>
      )}
    </div>
  );
}

export default AuthLink;
