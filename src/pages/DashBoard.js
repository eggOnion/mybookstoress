import React from "react";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is a protected route. Only logged-in users can see this.</p>
      <button onClick={handleLogout} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
