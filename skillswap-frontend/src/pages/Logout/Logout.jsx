import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import './Logout.css';

function Logout() {
  usePageMeta('Logout');
  return (
    <div className="page-container">
      <h1>Logout</h1>
      <p>You’ve been logged out successfully.</p>
    </div>
  );
}

export default Logout;
