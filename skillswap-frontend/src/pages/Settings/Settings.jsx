import React, { useState } from "react";
import Header from "../../components/HomePage/Header";
import "./Settings.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  // PROFILE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [skills, setSkills] = useState(["JavaScript", "Python", "Spanish"]);
  const [interests, setInterests] = useState([
    "Photography",
    "Cooking",
    "Music",
  ]);

  // SECURITY
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // NOTIFICATIONS
  const [emailCourseUpdates, setEmailCourseUpdates] = useState(true);
  const [emailMessages, setEmailMessages] = useState(false);
  const [emailAnnouncements, setEmailAnnouncements] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);

  // PRIVACY
  const [isPublic, setIsPublic] = useState(true);
  const [dataPersonalization, setDataPersonalization] = useState(true);

  // HANDLERS
  const handleUpdatePassword = () => {
    const payload = { currentPassword, newPassword, confirmPassword };
    console.log("Password Update Payload:", payload);
  };

  const handleUpdateSecurity = () => {
    const payload = { twoFactorEnabled };
    console.log("Security Payload:", payload);
  };

  const handleUpdateNotifications = () => {
    const payload = {
      emailCourseUpdates,
      emailMessages,
      emailAnnouncements,
      pushEnabled,
    };
    console.log("Notification Payload:", payload);
  };

  const handleUpdatePrivacy = () => {
    const payload = { isPublic, dataPersonalization };
    console.log("Privacy Payload:", payload);
  };

  const handleDeleteAccount = () => {
    console.log("Delete Account Triggered");
  };

  return (
    <>
      <Header />
      <div className="settings-page">
        <div className="settings-header">
          <h1>Account Settings</h1>
          <p>Manage your account preferences and profile information</p>
          <button className="save-btn">Save Changes</button>
        </div>

        <div className="settings-card">
          <div className="settings-tabs">
            <button
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              Profile Information
            </button>
            <button
              className={activeTab === "security" ? "active" : ""}
              onClick={() => setActiveTab("security")}
            >
              Account & Security
            </button>
            <button
              className={activeTab === "notifications" ? "active" : ""}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              className={activeTab === "privacy" ? "active" : ""}
              onClick={() => setActiveTab("privacy")}
            >
              Privacy & Preferences
            </button>
          </div>

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="tab-content">
              <h2>Profile Information</h2>
              <p>Update your personal information and profile details</p>

              <div className="profile-row">
                <div className="profile-avatar">User</div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group full">
                <label>Bio</label>
                <textarea
                  rows="4"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <small>Maximum 500 characters</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State/Country"
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="skills-section">
                <label>Skills</label>
                <div className="tags">
                  {skills.map((s, i) => (
                    <span key={i} className="tag green">
                      {s} ✕
                    </span>
                  ))}
                </div>
                <div className="add-row">
                  <input type="text" placeholder="Add a skill..." />
                  <button className="add-btn">Add</button>
                </div>
              </div>

              <div className="skills-section">
                <label>Interests</label>
                <div className="tags">
                  {interests.map((i, idx) => (
                    <span key={idx} className="tag orange">
                      {i} ✕
                    </span>
                  ))}
                </div>
                <div className="add-row">
                  <input type="text" placeholder="Add an interest..." />
                  <button className="add-btn">Add</button>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="tab-content">
              <h2>Account & Security</h2>
              <p>Update your password and manage security.</p>

              {/* CHANGE PASSWORD */}
              <h3>Change Password</h3>
              <div className="form-row">
                <div className="form-group" style={{ maxWidth: "50%" }}>
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={handleUpdatePassword}
                  style={{
                    background: "#FF6A2F",
                    border: "none",
                    padding: "10px 22px",
                    color: "white",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Update Password
                </button>
              </div>

              {/* 2FA */}
              <div style={{ marginTop: "40px" }}>
                <h3>Two-Factor Authentication (2FA)</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#F9FAFB",
                    padding: "16px 20px",
                    borderRadius: "10px",
                    border: "1px solid #E5E8EB",
                  }}
                >
                  <p style={{ margin: 0, color: "#637381" }}>
                    Adds extra security to your account.
                  </p>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
  <div className="tab-content notifications-tab">
    <h2>Notifications</h2>
    <p>Choose what updates you want to receive.</p>

    {/* EMAIL NOTIFICATIONS BOX */}
    <div className="notification-box">
      <h3>Email Notifications</h3>
      <div className="notification-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={emailCourseUpdates}
            onChange={() => setEmailCourseUpdates(!emailCourseUpdates)}
          />
          Course Updates
        </label>
      </div>
      <div className="notification-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={emailMessages}
            onChange={() => setEmailMessages(!emailMessages)}
          />
          Messages
        </label>
      </div>
      <div className="notification-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={emailAnnouncements}
            onChange={() => setEmailAnnouncements(!emailAnnouncements)}
          />
          Announcements
        </label>
      </div>
    </div>

    {/* PUSH NOTIFICATIONS BOX */}
    <div className="notification-box">
      <h3>Push Notifications</h3>
      <div className="notification-item push-item">
        <p>Choose if you want to receive push notifications.</p>
        <label className="toggle">
          <input
            type="checkbox"
            checked={pushEnabled}
            onChange={() => setPushEnabled(!pushEnabled)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  </div>
)}


          {activeTab === "privacy" && (
  <div className="tab-content privacy-tab">
    <h2>Privacy & Preferences</h2>
    <p>Control your privacy settings and personalization.</p>

    {/* ACCOUNT PRIVACY */}
    <div className="privacy-box">
      <h3>Account Privacy</h3>
      <div className="privacy-item">
        <p>Turn this on if you want a public account.</p>
        <label className="toggle">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>

    {/* DATA & PERSONALIZATION */}
    <div className="privacy-box">
      <h3>Data and Personalization</h3>
      <div className="privacy-item">
        <p>Turn this on if you consent to using your data.</p>
        <label className="toggle">
          <input
            type="checkbox"
            checked={dataPersonalization}
            onChange={() => setDataPersonalization(!dataPersonalization)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>

    {/* ACCOUNT DELETION */}
    <div className="privacy-box">
      <h3>Account Deletion</h3>
      <div className="privacy-item delete-item">
        <p>Permanently delete all your data. This cannot be undone.</p>
        <button
          style={{
            background: "#FF3B30",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
	  {/* FOOTER */}
<footer className="settings-footer">
  <p>© 2025 SkillSwap. All rights reserved.</p>
</footer>

    </>
  );
}
