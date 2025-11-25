import React, { useState } from "react";
import Header from "../../components/HomePage/Header";
import "./Settings.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Header />
      <div className="settings-page">
        <div className="settings-header">
          <h1>Account Settings</h1>
          <p>Manage your account preferences and profile information</p>
          <button className="save-btn">Save Changes</button>
        </div>

        {/* Wrap tabs + content in the card */}
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

          {/* Tab Content */}
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
                  <input type="text" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" />
                </div>
              </div>

              <div className="form-group full">
                <label>Bio</label>
                <textarea rows="4"></textarea>
                <small>Maximum 500 characters</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="City, State/Country" />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input type="text" placeholder="https://yourwebsite.com" />
                </div>
              </div>

              <div className="skills-section">
                <label>Skills</label>
                <div className="tags">
                  <span className="tag green">JavaScript ✕</span>
                  <span className="tag green">Python ✕</span>
                  <span className="tag green">Spanish ✕</span>
                </div>
                <div className="add-row">
                  <input type="text" placeholder="Add a skill..." />
                  <button className="add-btn">Add</button>
                </div>
              </div>

              <div className="skills-section">
                <label>Interests</label>
                <div className="tags">
                  <span className="tag orange">Photography ✕</span>
                  <span className="tag orange">Cooking ✕</span>
                  <span className="tag orange">Music ✕</span>
                </div>
                <div className="add-row">
                  <input type="text" placeholder="Add an interest..." />
                  <button className="add-btn">Add</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="tab-content">
              <h2>Account & Security</h2>
              <p>Update your login and account security settings</p>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="tab-content">
              <h2>Notifications</h2>
              <p>Customize how you receive notifications</p>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="tab-content">
              <h2>Privacy & Preferences</h2>
              <p>Control your privacy and personalization settings</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
