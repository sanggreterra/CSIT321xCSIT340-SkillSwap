import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import './Settings.css';

function Settings() {
  usePageMeta('Settings');
  return (
    <div className="page-container">
      <h1>User Settings</h1>
      <p>Manage your account preferences here.</p>
    </div>
  );
}

export default Settings;
