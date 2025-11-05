import React from 'react';
import './Header.css';
import SkillSwapLogo from '../../skillswap_icon.png'

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            <img src={SkillSwapLogo} alt="SkillSwap Logo" />
          </div>
          <span className="logo-text">SKILLSWAP</span>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#637381" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input type="text" placeholder="Search Skills" className="search-input" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav-items">
          <a href="#" className="nav-item">Home</a>
          <a href="#" className="nav-item">
            Skills
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="#3C3C3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#" className="nav-item">About Us</a>
        </nav>

        {/* Buttons */}
        <div className="header-buttons">
          <button className="btn-outline" onClick={() => window.location.hash = '#signup'}>Register</button>
          <button className="btn-primary" onClick={() => window.location.hash = '#login'}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="white"/>
              <path d="M8 10C5.79086 10 4 11.7909 4 14V16H12V14C12 11.7909 10.2091 10 8 10Z" fill="white"/>
            </svg>
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
