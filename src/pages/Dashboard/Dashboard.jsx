import React from "react";
import Header from "../../components/HomePage/Header";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome back, John!</h2>
        <p className="dashboard-subtitle">
          Here's your learning progress and achievements
        </p>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon orange"></div>
            <div className="stat-content">
              <div className="stat-header">
                <span>Skill Streak</span>
                <span className="status active">Active</span>
              </div>
              <h3>12 days</h3>
              <p>Longest: 28 days</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green"></div>
            <div className="stat-content">
              <div className="stat-header">
                <span>Login Streak</span>
                <span className="status gain">+2</span>
              </div>
              <h3>8 days</h3>
              <p>Longest: 15 days</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon coral"></div>
            <div className="stat-content">
              <div className="stat-header">
                <span>Total Skills</span>
                <span className="status gain">+12%</span>
              </div>
              <h3>24</h3>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon mint"></div>
            <div className="stat-content">
              <div className="stat-header">
                <span>Hours Spent</span>
                <span className="status gain">+5%</span>
              </div>
              <h3>89</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-mid">
          <div className="daily-activity">
            <div className="section-header">
              <h4>Daily Activity</h4>
              <span className="small-text">Last 7 Days</span>
            </div>
            <div className="activity-graph">
              {["2", "1", "3", "0", "2", "1", "4"].map((num, idx) => (
                <div
                  className={`activity-box ${num !== "0" ? "active" : ""}`}
                  key={idx}
                >
                  <h5>{num}</h5>
                  <p>skills</p>
                </div>
              ))}
            </div>
            <div className="activity-days">
              {["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>

          <div className="recent-achievements">
            <h4>Recent Achievements</h4>
            <div className="achievement">
              <div className="ach-icon orange"></div>
              <div className="ach-details">
                <h5>Skill Streak Master</h5>
                <p>Maintained a 10-day learning streak</p>
                <span className="tag rare">rare</span>
              </div>
            </div>

            <div className="achievement">
              <div className="ach-icon gray"></div>
              <div className="ach-details">
                <h5>Early Bird</h5>
                <p>Logged in for 7 consecutive days</p>
                <span className="tag common">common</span>
              </div>
            </div>

            <div className="achievement">
              <div className="ach-icon green"></div>
              <div className="ach-details">
                <h5>Knowledge Seeker</h5>
                <p>Completed 5 different skill categories</p>
                <span className="tag uncommon">uncommon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-bottom">
          <div className="learning-goals">
            <div className="section-header">
              <h4>Learning Goals</h4>
              <a href="#">View All</a>
            </div>

            <div className="goal">
              <h5>Complete React Mastery Course</h5>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "75%" }}></div>
              </div>
              <div className="goal-meta">
                <span>75 / 100</span>
                <span>Due: 4/15/2024</span>
              </div>
            </div>

            <div className="goal">
              <h5>Practice Spanish 30 minutes daily</h5>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "73%" }}></div>
              </div>
              <div className="goal-meta">
                <span>22 / 30</span>
                <span>Due: 3/31/2024</span>
              </div>
            </div>
          </div>

          <div className="skill-performance">
            <div className="section-header">
              <h4>Skill Performance</h4>
              <a href="#">View Details</a>
            </div>

            <div className="skill-item">
              <h5>JavaScript</h5>
              <div className="skill-meta">
                <span>25h spent · 12 sessions</span>
                <span className="percent">92% <span className="gain">+15%</span></span>
              </div>
            </div>

            <div className="skill-item">
              <h5>React</h5>
              <div className="skill-meta">
                <span>20h spent · 8 sessions</span>
                <span className="percent">88% <span className="gain">+10%</span></span>
              </div>
            </div>

            <div className="skill-item">
              <h5>Spanish</h5>
              <div className="skill-meta">
                <span>18h spent · 15 sessions</span>
                <span className="percent">85% <span className="gain">+12%</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
