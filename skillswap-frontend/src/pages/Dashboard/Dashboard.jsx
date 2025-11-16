import React, { useEffect, useState } from "react";
import { FaFire, FaSignInAlt, FaLayerGroup, FaClock } from "react-icons/fa";
import { HiOutlineFire, HiOutlineSun, HiOutlineBookOpen } from "react-icons/hi2";
import Header from "../../components/HomePage/Header";
import { userService } from '../../services';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";

const Dashboard = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    (async () => {
      try {
        const res = await userService.getProfile(userId);
        const data = res.data || res;
        setName(data.name || '');
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    })();
  }, []);


  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome back, {name || 'there'}!</h2>
        <p className="dashboard-subtitle">
          Here's your learning progress and achievements
        </p>

        <div className="dashboard-stats">
          <div className="stat-card">
			<div className="stat-icon orange">
				<FaFire />
			</div>
			<span className="status active">Active</span>
			<div className="stat-header">
				<span>Skill Streak</span>
			</div>
			<h3>12 days</h3>
			<p>Longest: 28 days</p>
		   </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <FaSignInAlt />
            </div>
            <span className="status gain">+2</span>
            <div className="stat-header">
              <span>Login Streak</span>
            </div>
            <h3>8 days</h3>
            <p>Longest: 15 days</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon coral">
              <FaLayerGroup />
            </div>
			<span className="status gain">+12%</span>
            <div className="stat-header">
              <span>Total Skills</span>              
            </div>
            <h3>24</h3>
          </div>

          <div className="stat-card">
            <div className="stat-icon mint">
              <FaClock />
            </div>
            <span className="status gain">+5%</span>
            <div className="stat-header">
              <span>Hours Spent</span>
              <span className="status gain">+5%</span>
            </div>
            <h3>89</h3>
          </div>
        </div>

        <div className="dashboard-mid">
		<div className="daily-activity">
  <div className="section-header">
    <h4>Daily Activity</h4>
    <span className="small-text">Last 7 Days</span>
  </div>

  <div className="activity-graph">
    {[
      { day: "Fri", num: "2" },
      { day: "Sat", num: "1" },
      { day: "Sun", num: "3" },
      { day: "Mon", num: "0" },
      { day: "Tue", num: "2" },
      { day: "Wed", num: "1" },
      { day: "Thu", num: "4" },
    ].map(({ day, num }, idx) => (
      <div className="activity-item" key={idx}>
        <div className={`activity-box ${num !== "0" ? "active" : ""}`}>
          <h5>{num}</h5>
          <p>skills</p>
        </div>
        <span className="activity-day">{day}</span>
      </div>
    ))}
  </div>
</div>




         <div className="recent-achievements">
  <div className="section-header">
    <h4>Recent Achievements</h4>
  </div>

  <div className="achievement">
    <div className="ach-icon orange">
      <HiOutlineFire />
    </div>
    <div className="ach-details">
      <h5>Skill Streak Master</h5>
      <p>Maintained a 10-day learning streak</p>
      <span className="tag rare">rare</span>
    </div>
  </div>

  <div className="achievement">
    <div className="ach-icon gray">
      <HiOutlineSun />
    </div>
    <div className="ach-details">
      <h5>Early Bird</h5>
      <p>Logged in for 7 consecutive days</p>
      <span className="tag common">common</span>
    </div>
  </div>

  <div className="achievement">
    <div className="ach-icon green">
      <HiOutlineBookOpen />
    </div>
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
    <div className="goal-header">
      <h5>Complete React Mastery Course</h5>
      <span className="goal-percent">75%</span>
    </div>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: "75%" }}></div>
    </div>
    <div className="goal-meta">
      <span>75 / 100</span>
      <span>Due: 4/15/2024</span>
    </div>
  </div>

  <div className="goal">
    <div className="goal-header">
      <h5>Practice Spanish 30 minutes daily</h5>
      <span className="goal-percent">73%</span>
    </div>
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
  <div className="skill-header">
    <h5>JavaScript</h5>
    <span className="primary-percent">92%</span>
  </div>
  <div className="skill-meta">
    <span>25h spent · 12 sessions</span>
    <span className="gain">+15%</span>
  </div>
</div>

<div className="skill-item">
  <div className="skill-header">
    <h5>React</h5>
    <span className="primary-percent">88%</span>
  </div>
  <div className="skill-meta">
    <span>20h spent · 8 sessions</span>
    <span className="gain">+10%</span>
  </div>
</div>

<div className="skill-item">
  <div className="skill-header">
    <h5>Spanish</h5>
    <span className="primary-percent">85%</span>
  </div>
  <div className="skill-meta">
    <span>18h spent · 15 sessions</span>
    <span className="gain">+12%</span>
  </div>
</div>

          </div>
<footer className="dashboard-footer sticky">
  <p>© 2025 SkillSwap. All rights reserved.</p>
</footer>


        </div>
      </div>
    </>
  );
};

export default Dashboard;
