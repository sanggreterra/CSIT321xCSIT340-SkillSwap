import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SignedHeader.css';
import SkillSwapLogo from '../../skillswap_icon.png';

const SignedHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const pathname = location.pathname || '';
  const isAuthPage = pathname === '/signup' || pathname === '/login';

  useEffect(() => {
    const uid = localStorage.getItem('userId');
    if (uid) {
      const storedUser = JSON.parse(localStorage.getItem('userProfile')) || {
        name: 'John Doe',
        role: 'Member',
      };
      setUser(storedUser);
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);

    if (isAuthPage) document.body.classList.add('auth-header-fixed');
    else document.body.classList.remove('auth-header-fixed');

    return () => {
      window.removeEventListener('click', handleClickOutside);
      document.body.classList.remove('auth-header-fixed');
    };
  }, [isAuthPage]);

  const handleLogout = () => {
    navigate('/logout');
  };

  const userInitial = user ? user.name[0] : '?';
  const userName = user ? user.name : 'User';
  const userRole = user ? user.role : 'Unknown';

  return (
    <header className={`header ${isAuthPage ? 'fixed-header' : ''}`}>
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')}>
          <div className="logo-icon">
            <img src={SkillSwapLogo} alt="SkillSwap Logo" />
          </div>
          <span className="logo-text">SKILLSWAP</span>
        </div>

        <div className="header-right">
          <nav className="nav-items">
            <a className="nav-item dashboard" onClick={() => navigate('/dashboard')}>
              Dashboard
            </a>
            <a className="nav-item" onClick={() => navigate('/courses')}>
              Courses
            </a>
          </nav>

          <div className="user-box-wrapper" ref={dropdownRef}>
            <div className="user-box" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="avatar">{userInitial}</div>
              <div className="user-info">
                <strong>{userName}</strong>
                <span>{userRole}</span>
              </div>
              <div className="arrow">
                <i className={`fa-solid fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
              </div>
            </div>

            {dropdownOpen && (
              <div className="user-dropdown">
                <div onClick={() => navigate('/profile')}>Profile</div>
                <div onClick={() => navigate('/settings')}>User Settings</div>
                <div className="logout" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SignedHeader;
