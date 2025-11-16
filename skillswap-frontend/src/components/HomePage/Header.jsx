import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import SkillSwapLogo from '../../skillswap_icon.png'

const Header = () => {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setSignedIn(!!token);
    // update when storage changes in other tabs
    const onStorage = (e) => {
      if (e.key === 'token') setSignedIn(!!e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setSignedIn(false);
    navigate('/login');
  };

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
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/courses'); }}>
            Skills
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="#3C3C3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/'); }}>About Us</a>
        </nav>

        {/* Buttons */}
        <div className="header-buttons">
          {!signedIn ? (
            <>
              <button className="btn-outline" onClick={() => navigate('/signup')}>Register</button>
              <button className="btn-primary" onClick={() => navigate('/login')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="white"/>
                  <path d="M8 10C5.79086 10 4 11.7909 4 14V16H12V14C12 11.7909 10.2091 10 8 10Z" fill="white"/>
                </svg>
                Login
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={handleLogout} title="Logout">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}>
                <path d="M6 2C6 1.44772 6.44772 1 7 1H13C13.5523 1 14 1.44772 14 2V14C14 14.5523 13.5523 15 13 15H7C6.44772 15 6 14.5523 6 14V11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 8H1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 5L1 8L4 11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
