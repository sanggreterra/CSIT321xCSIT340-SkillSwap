import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import "./Logout.css";
import { userService } from "../../services";

function Logout() {
  usePageMeta("Logout");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    if (!uid) {
      setLoading(false);
      return;
    }
    userService
      .getProfile(uid)
      .then((res) => {
        setUser(res.data || null);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    setAccounts([]);
    navigate("/login");
  };

  const handleStaySignedIn = () => {
    navigate("/dashboard");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSwitchAccount = (account) => {
    console.log("Switch to account:", account);
    setDropdownOpen(false);
  };

  return (
    <div className="logout-wrapper">
      <div className="logout-card">

        {/* Header Section */}
        <div className="logout-header">
          <div className="logout-icon">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
          <h1>Sign Out</h1>
          <p>Choose how you'd like to proceed</p>
        </div>

        {/* User Box */}
        <div className="user-box-wrapper">
          {loading ? (
            <div className="user-box loading">Loading...</div>
          ) : user ? (
            <div className="user-box">
              <div className="avatar">{(user.name && user.name[0]) || "?"}</div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              <div className="arrow" onClick={toggleDropdown}>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
          ) : (
            <div className="user-box empty">
              <div className="avatar">?</div>
              <div className="user-info">
                <h3>Not signed in</h3>
                <p>No active account</p>
              </div>
            </div>
          )}

          {/* Dropdown */}
          {dropdownOpen && accounts.length > 0 && (
            <div className="user-dropdown">
              {accounts.map((acc, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSwitchAccount(acc)}
                >
                  <div className="avatar-small">{(acc.name && acc.name[0]) || "?"}</div>
                  <div className="user-info-small">
                    <p>{acc.name}</p>
                    <small>{acc.email}</small>
                  </div>
                </div>
              ))}
              <div className="dropdown-item add-account">+ Add Account</div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <button className="btn-logout" onClick={handleSignOut}>
          Sign Out Completely
        </button>
        <button className="btn-stay" onClick={handleStaySignedIn}>
          Stay Signed In
        </button>

        <hr />

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <p className="quick-actions-title">Quick Actions</p>
          <div className="quick-actions">
            <div>
              <i className="fa-solid fa-gear qa-icon"></i>
              <p>Settings</p>
            </div>
            <div>
              <i className="fa-solid fa-circle-question qa-icon"></i>
              <p>Help</p>
            </div>
            <div>
              <i className="fa-solid fa-file-lines qa-icon"></i>
              <p>Feedback</p>
            </div>
          </div>
        </div>

        {/* Footer Security */}
        <div className="footer-security">
          <p>
            <i className="fa-solid fa-circle-check"></i> Secure Connection &nbsp; • &nbsp;
            <i className="fa-solid fa-lock"></i> Data Protected
          </p>
          <small>Your session will be securely terminated and all local data cleared.</small>
        </div>
      </div>
    </div>
  );
}

export default Logout;
