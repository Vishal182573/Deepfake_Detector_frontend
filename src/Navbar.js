import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-icon">🔍</div>
        <span>DeepShield</span>
      </Link>

      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/detect">Detector</NavLink></li>
        <li><NavLink to="/research">Research</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/detect" className="nav-cta">Try Now →</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
