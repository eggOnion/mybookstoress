import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import JWTCounter from "../components/JWTCounter";
import { howToUseApp } from "../services/references";

import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mybookstoress-backend.vercel.app/login", {
        username,
        password,
      });

      // Reset the timer counter on successful login
      localStorage.setItem("counter", 60); // Reset the counter to 60 seconds

      setShowWelcome(true);
      setMessage(response.data.message);
      setError("");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  const handleClosePopup = () => {
    setShowWelcome(false);
    navigate("/books");
    window.location.reload();
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ fontWeight: "bold", color: "red" }}>{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form-input">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </div>
      </form>
      {showWelcome && (
        <div className="welcome-popup">
          <JWTCounter
            message={`Welcome, ${username}!`}
            onClose={handleClosePopup}
          />        
          <p>Welcome, {username}!</p>
          <strong>{howToUseApp.guide}</strong>
          <div className="app-usage-guide">
            <br />
            <br />
            <strong style={{color: "#2ecc71"}}>{howToUseApp.guideActive}</strong>
            <br />
            <br />
            <strong style={{color: "#e74c3c"}}>{howToUseApp.guideInactive}</strong>
            <br />
            <br />
            <strong style={{color: "#eb984e"}}>{howToUseApp.guidePublic}</strong>
            <br />
          </div>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Login;
