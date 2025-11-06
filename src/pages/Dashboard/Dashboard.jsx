import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import './Dashboard.css';

function Dashboard() {
  usePageMeta('Dashboard');
  return (
    <div className="page-container">
      <h1>User Dashboard</h1>
      <p>Welcome to your dashboard.</p>
    </div>
  );
}

export default Dashboard;
