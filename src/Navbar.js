import { NavLink } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
const Navbar = () => {
  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
    };
  };

  return (
    <nav className="navbar">
      <h1>TODO-IST</h1>
      <div className="links">
        <NavLink style={navLinkStyle} to="/">
          Home
        </NavLink>
        <NavLink style={navLinkStyle} to="/create">
          New Task
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
