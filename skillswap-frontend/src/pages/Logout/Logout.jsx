import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import './Logout.css';

function Logout() {
  usePageMeta('Logout');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth state and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  }, [navigate]);

  return (
    <div className="page-container">
      <h1>Logging out...</h1>
      <p>You will be redirected to the sign in page.</p>
    </div>
  );
}

export default Logout;
