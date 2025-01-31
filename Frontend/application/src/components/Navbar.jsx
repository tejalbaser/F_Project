import React from "react";
import { Link } from "react-router-dom";
import logo1 from '../assets/logo1.png';
import "./navbar.css";

function Navbar({ user }) {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <div className="logo">
                    <img src={logo1} alt="Site Logo" />
                    <h1>Fluento Shopping</h1>
                </div>
                <span className="tagline">Making your gifting wishes come true..!</span>
            </div>
            <div className="nav-links">
                <Link to="/home" className="nav-link">Home</Link>
                <b>|</b>
                <Link to="/cart" className="nav-link">Cart</Link>
                <b>|</b>
                <Link to="/account" className="nav-link">Account</Link>
                <b>|</b>
                <Link to="/help" className="nav-link">About</Link>
            </div>
            <div className="auth-button">
                {user ? (
                    <button className="login-button">Logout</button>
                ) : (
                    <Link to="/login" className="login-button">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
