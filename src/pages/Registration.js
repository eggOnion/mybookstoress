import React, { useState } from "react";
import axios from "axios";

import "../styles/registration.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mybookstoress-backend.vercel.app/register", {
        username,
        password,
      });
      setMessage(response.data.message);
      setError("");
      setUsername("");
      setPassword("");
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="registration-page">
      <h2>Register</h2>
      {message && (
        <p style={{ fontWeight: "bold", color: "#58d68d " }}>{message}</p>
      )}
      {error && <p style={{ fontWeight: "bold", color: "red" }}>{error}</p>}
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="registration-form-input">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
