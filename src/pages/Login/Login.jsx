import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import SkillSwapLogo from '../../skillswap_icon.png'
import { usePageMeta } from '../../hooks/usePageMeta';

const Login = () => {
  usePageMeta('Login');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return email.includes('@') && email.length > 0;
  };

  const validatePassword = (password) => {
    if (password.length < 8) return false;
    
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasLowercase && hasUppercase && hasNumbers && hasSymbols;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle login logic here
    console.log('Login data:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-content">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-icon">
            <img src={SkillSwapLogo} alt="SkillSwap Logo" width={40} height={40} />
            </div>
            <h1 className="logo-text">SKILLSWAP</h1>
          </div>

          {/* Welcome Text */}
          <div className="welcome-section">
            <h2 className="welcome-title">Welcome Back</h2>
            <p className="welcome-subtitle">Sign in to continue your learning journey</p>
          </div>

          {/* Login Form */}
          <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  <label htmlFor="rememberMe" className="checkbox-label">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>

            <div className="signup-link">
              <span>Don't have an account? </span>
              <button onClick={() => navigate('/signup')} className="signup-text">Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
