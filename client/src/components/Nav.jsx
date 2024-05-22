import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar">
      <Link to="/">Landing Page</Link>
      <Link to="/projects">My Profile</Link>
      <Link to="/resume">Sign Up</Link>
      <Link to="/contact">AI Page</Link>
    </nav>
  );
};

export default Nav;