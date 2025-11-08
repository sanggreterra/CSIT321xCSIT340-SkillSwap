import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import SkillSwapLogo from '../../skillswap_icon.png'
import { usePageMeta } from '../../hooks/usePageMeta';
import { authService } from '../../services';

const Signup = () => {
  usePageMeta('Signup');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false
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

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword && confirmPassword.length > 0;
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, numbers, and symbols';
    }

    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Prepare payload for backend
    const payload = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      email: formData.email.trim(),
      password: formData.password,
    };

    // Call backend register endpoint and navigate to dashboard on success
    (async () => {
      try {
        const res = await authService.register(payload);
        const data = res.data || res;
        // expected { token, userId }
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          navigate('/dashboard');
        } else {
          setErrors({ form: 'Unexpected response from server' });
        }
      } catch (err) {
        // If backend responds with 409 Conflict, show a friendly message for duplicate email
        const status = err?.response?.status;
        if (status === 409) {
          setErrors({ form: 'That email is already registered.' });
        } else {
          const msg = err?.response?.data || err.message || 'Registration failed';
          setErrors({ form: String(msg) });
        }
      }
    })();
  };

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="signup-content">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-icon">
            <img src={SkillSwapLogo} alt="SkillSwap Logo" width={40} height={40} />
            </div>
            <h1 className="logo-text">SKILLSWAP</h1>
          </div>

          {/* Welcome Text */}
          <div className="welcome-section">
            <h2 className="welcome-title">Join SkillSwap</h2>
            <p className="welcome-subtitle">Create your account and start your learning journey today</p>
          </div>

          {/* Signup Form */}
          <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a strong password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className="form-checkboxes">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  <label htmlFor="agreeToTerms" className="checkbox-label">
                    I agree to the <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a> *
                  </label>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="subscribeNewsletter"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={handleInputChange}
                    className="checkbox"
                  />
                  <label htmlFor="subscribeNewsletter" className="checkbox-label">
                    Subscribe to our newsletter for skill-sharing tips and updates
                  </label>
                </div>
              </div>

              <button type="submit" className="signup-button">
                Create Account
              </button>
              {errors.form && <div className="form-error">{errors.form}</div>}
            </form>

            <div className="login-link">
              <span>Already have an account? </span>
              <button onClick={() => navigate('/login')} className="login-text">Sign in</button>
            </div>

            {/* Social Login */}
            <div className="social-divider">
              <div className="divider-line"></div>
              <span className="divider-text">Or sign up with</span>
              <div className="divider-line"></div>
            </div>

            <div className="social-buttons">
              <button className="social-button google">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.6 10.2273C19.6 9.51818 19.5364 8.83636 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z" fill="#4285F4"/>
                  <path d="M10 20C12.7 20 14.9636 19.1045 16.6182 17.5773L13.3864 15.0682C12.4909 15.6682 11.3455 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z" fill="#34A853"/>
                  <path d="M4.40455 11.9C4.20455 11.3 4.09091 10.6591 4.09091 10C4.09091 9.34091 4.20455 8.7 4.40455 8.1V5.50909H1.06364C0.386364 6.85909 0 8.38636 0 10C0 11.6136 0.386364 13.1409 1.06364 14.4909L4.40455 11.9Z" fill="#FBBC05"/>
                  <path d="M10 3.97727C11.4682 3.97727 12.7864 4.48182 13.8227 5.47273L16.6909 2.60455C14.9591 0.990909 12.6955 0 10 0C6.09091 0 2.70909 2.24091 1.06364 5.50909L4.40455 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <button className="social-button facebook">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" fill="#1877F2"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
