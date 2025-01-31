import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Login data:", credentials);
    try {
      const response = await axios.post("http://localhost:5000/api/login", credentials);
      alert(response.data.message);
      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token); // Save token
        navigate("/home"); // Redirect to home page
      }
      else {
        alert("Login failed. No user data returned.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
    <div className="login-box">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome Back! 👋</h2>
        <p>Log in to access your account and enjoy a seamless shopping experience.</p>
        <img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="Login Icon" className="login-icon" />
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {/* Additional Links */}
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      <p><Link to="/forgot-password">Forgot Password?</Link></p>
    </div>
  </div>
  );
}

export default Login;
