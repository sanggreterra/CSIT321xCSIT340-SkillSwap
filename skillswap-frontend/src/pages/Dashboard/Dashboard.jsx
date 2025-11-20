import React, { useEffect, useState } from "react";
import { FaFire, FaSignInAlt, FaLayerGroup, FaClock } from "react-icons/fa";
import { HiOutlineFire, HiOutlineSun, HiOutlineBookOpen } from "react-icons/hi2";
import Header from "../../components/HomePage/Header";
import { userService, exchangeService, matchService, calendarService, ratingService } from '../../services';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";

const Dashboard = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    skillStreak: 0,
    longestSkillStreak: 0,
    totalSkills: 0,
    hoursSpent: 0,
    activeMatches: 0,
    totalExchanges: 0,
    dailyActivity: [],
    recentAchievements: [],
    skillPerformance: []
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [profileRes, exchangesRes, matchesRes, calendarRes, ratingsRes] = await Promise.all([
          userService.getProfile(userId).catch(() => ({ data: {}, response: {} })),
          exchangeService.getExchangesForUser(userId).catch(() => ({ data: [] })),
          matchService.getMatchesForUser(userId).catch(() => ({ data: [] })),
          calendarService.getEventsForUser(userId).catch(() => ({ data: [] })),
          ratingService.getRatingsForUser(userId).catch(() => ({ data: [] }))
        ]);

        const profile = profileRes.data || profileRes;
        const exchanges = Array.isArray(exchangesRes.data) ? exchangesRes.data : [];
        const matches = Array.isArray(matchesRes.data) ? matchesRes.data : [];
        const calendarEvents = Array.isArray(calendarRes.data) ? calendarRes.data : [];
        const ratings = Array.isArray(ratingsRes.data) ? ratingsRes.data : [];

        setName(profile.name || '');

        // Calculate statistics
        const calculatedStats = calculateStats(exchanges, matches, calendarEvents, ratings);
        setStats(calculatedStats);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const calculateStats = (exchanges, matches, calendarEvents, ratings) => {
    // Calculate skill streak (consecutive days with calendar events or exchanges)
    const { currentStreak, longestStreak } = calculateStreak(calendarEvents, exchanges);
    
    // Calculate total unique skills from exchanges and matches
    const skillIds = new Set();
    exchanges.forEach(ex => {
      if (ex.match?.offering?.skill?.id) skillIds.add(ex.match.offering.skill.id);
      if (ex.match?.request?.skill?.id) skillIds.add(ex.match.request.skill.id);
    });
    matches.forEach(m => {
      if (m.offering?.skill?.id) skillIds.add(m.offering.skill.id);
      if (m.request?.skill?.id) skillIds.add(m.request.skill.id);
    });
    const totalSkills = skillIds.size;

    // Calculate hours spent from calendar events
    let hoursSpent = 0;
    calendarEvents.forEach(event => {
      if (event.startTime && event.endTime) {
        const start = new Date(event.startTime);
        const end = new Date(event.endTime);
        const diffMs = end - start;
        const diffHours = diffMs / (1000 * 60 * 60);
        hoursSpent += diffHours;
      }
    });
    hoursSpent = Math.round(hoursSpent * 10) / 10; // Round to 1 decimal

    // Calculate active matches (PENDING or ACCEPTED)
    const activeMatches = matches.filter(m => m.status === 'PENDING' || m.status === 'ACCEPTED').length;

    // Calculate daily activity for last 7 days
    const dailyActivity = calculateDailyActivity(calendarEvents, exchanges);

    // Calculate recent achievements
    const recentAchievements = calculateAchievements(exchanges, ratings, currentStreak);

    // Calculate skill performance
    const skillPerformance = calculateSkillPerformance(exchanges, calendarEvents, ratings);

    return {
      skillStreak: currentStreak,
      longestSkillStreak: longestStreak,
      totalSkills,
      hoursSpent,
      activeMatches,
      totalExchanges: exchanges.length,
      dailyActivity,
      recentAchievements,
      skillPerformance
    };
  };

  const calculateStreak = (calendarEvents, exchanges) => {
    const activityDates = new Set();
    
    // Add dates from calendar events
    calendarEvents.forEach(event => {
      if (event.startTime) {
        const date = new Date(event.startTime).toDateString();
        activityDates.add(date);
      }
    });

    // Add dates from exchanges
    exchanges.forEach(ex => {
      if (ex.scheduledDate) {
        const date = new Date(ex.scheduledDate).toDateString();
        activityDates.add(date);
      }
      if (ex.createdAt) {
        const date = new Date(ex.createdAt).toDateString();
        activityDates.add(date);
      }
    });

    const sortedDates = Array.from(activityDates)
      .map(d => new Date(d))
      .sort((a, b) => b - a);

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);
      date.setHours(0, 0, 0, 0);
      
      if (i === 0) {
        const daysDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
        if (daysDiff <= 1) {
          currentStreak = 1;
          tempStreak = 1;
        } else {
          tempStreak = 1;
        }
      } else {
        const prevDate = new Date(sortedDates[i - 1]);
        prevDate.setHours(0, 0, 0, 0);
        const daysDiff = Math.floor((prevDate - date) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          tempStreak++;
          if (i === 0 || (i > 0 && currentStreak === i)) {
            currentStreak++;
          }
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
          if (i === 0) currentStreak = 0;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    return { currentStreak: Math.max(currentStreak, 0), longestStreak: Math.max(longestStreak, 0) };
  };

  const calculateDailyActivity = (calendarEvents, exchanges) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const activityMap = {};

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayKey = days[date.getDay()];
      const dateKey = date.toDateString();
      activityMap[dateKey] = { day: dayKey, count: 0 };
    }

    // Count calendar events
    calendarEvents.forEach(event => {
      if (event.startTime) {
        const date = new Date(event.startTime).toDateString();
        if (activityMap[date]) {
          activityMap[date].count++;
        }
      }
    });

    // Count exchanges
    exchanges.forEach(ex => {
      if (ex.scheduledDate) {
        const date = new Date(ex.scheduledDate).toDateString();
        if (activityMap[date]) {
          activityMap[date].count++;
        }
      }
    });

    return Object.values(activityMap);
  };

  const calculateAchievements = (exchanges, ratings, currentStreak) => {
    const achievements = [];

    // Skill Streak Master
    if (currentStreak >= 10) {
      achievements.push({
        icon: 'orange',
        title: 'Skill Streak Master',
        description: `Maintained a ${currentStreak}-day learning streak`,
        tag: 'rare'
      });
    }

    // Exchange completion
    const completedExchanges = exchanges.filter(ex => ex.status === 'COMPLETED').length;
    if (completedExchanges >= 5) {
      achievements.push({
        icon: 'green',
        title: 'Knowledge Seeker',
        description: `Completed ${completedExchanges} skill exchanges`,
        tag: 'uncommon'
      });
    }

    // Ratings achievement
    if (ratings.length > 0) {
      const avgRating = ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / ratings.length;
      if (avgRating >= 4.5) {
        achievements.push({
          icon: 'orange',
          title: 'Top Performer',
          description: `Average rating of ${avgRating.toFixed(1)} stars`,
          tag: 'rare'
        });
      }
    }

    // First Exchange
    if (exchanges.length >= 1 && achievements.length === 0) {
      achievements.push({
        icon: 'gray',
        title: 'Getting Started',
        description: 'Completed your first skill exchange',
        tag: 'common'
      });
    }

    return achievements.slice(0, 3); // Return max 3 achievements
  };

  const calculateSkillPerformance = (exchanges, calendarEvents, ratings) => {
    const skillMap = {};

    // Process exchanges to group by skill
    exchanges.forEach(ex => {
      const skillName = ex.match?.offering?.skill?.name || ex.match?.request?.skill?.name || 'Unknown';
      if (!skillMap[skillName]) {
        skillMap[skillName] = { sessions: 0, hours: 0, exchanges: 0 };
      }
      skillMap[skillName].exchanges++;
    });

    // Process calendar events to calculate hours
    calendarEvents.forEach(event => {
      // Try to find associated exchange to get skill
      const associatedExchange = exchanges.find(ex => ex.id === event.exchangeId);
      if (associatedExchange) {
        const skillName = associatedExchange.match?.offering?.skill?.name || 
                         associatedExchange.match?.request?.skill?.name || 'Unknown';
        if (!skillMap[skillName]) {
          skillMap[skillName] = { sessions: 0, hours: 0, exchanges: 0 };
        }
        skillMap[skillName].sessions++;
        if (event.startTime && event.endTime) {
          const start = new Date(event.startTime);
          const end = new Date(event.endTime);
          const diffHours = (end - start) / (1000 * 60 * 60);
          skillMap[skillName].hours += diffHours;
        }
      }
    });

    // Process ratings for performance percentage
    const skillRatings = {};
    ratings.forEach(rating => {
      const exchange = exchanges.find(ex => ex.id === rating.exchangeId);
      if (exchange) {
        const skillName = exchange.match?.offering?.skill?.name || 
                         exchange.match?.request?.skill?.name || 'Unknown';
        if (!skillRatings[skillName]) {
          skillRatings[skillName] = [];
        }
        skillRatings[skillName].push(rating.rating || 0);
      }
    });

    // Convert to array and calculate percentages
    const performance = Object.keys(skillMap).map(skillName => {
      const data = skillMap[skillName];
      const skillRatingList = skillRatings[skillName] || [];
      const avgRating = skillRatingList.length > 0
        ? skillRatingList.reduce((sum, r) => sum + r, 0) / skillRatingList.length
        : 75; // Default to 75% if no ratings
      const performancePercent = Math.min(100, Math.round((avgRating / 5) * 100));

      return {
        name: skillName,
        percent: performancePercent,
        hours: Math.round(data.hours * 10) / 10,
        sessions: data.sessions || data.exchanges,
        gain: '+10%' // Placeholder, could calculate from historical data
      };
    });

    return performance.sort((a, b) => b.percent - a.percent).slice(0, 3);
  };


  if (loading) {
    return (
      <>
        <Header />
        <div className="dashboard-container">
          <h2 className="dashboard-title">Loading dashboard...</h2>
        </div>
      </>
    );
  }

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
			<span className="status active">{stats.skillStreak > 0 ? 'Active' : 'Inactive'}</span>
			<div className="stat-header">
				<span>Skill Streak</span>
			</div>
			<h3>{stats.skillStreak} {stats.skillStreak === 1 ? 'day' : 'days'}</h3>
			<p>Longest: {stats.longestSkillStreak} {stats.longestSkillStreak === 1 ? 'day' : 'days'}</p>
		   </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <FaSignInAlt />
            </div>
            <span className="status gain">+{stats.activeMatches}</span>
            <div className="stat-header">
              <span>Active Matches</span>
            </div>
            <h3>{stats.activeMatches}</h3>
            <p>Total: {stats.totalExchanges + stats.activeMatches}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon coral">
              <FaLayerGroup />
            </div>
			<span className="status gain">+{stats.totalSkills}</span>
            <div className="stat-header">
              <span>Total Skills</span>              
            </div>
            <h3>{stats.totalSkills}</h3>
            <p>{stats.totalExchanges} exchanges</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon mint">
              <FaClock />
            </div>
            <span className="status gain">+{stats.totalExchanges}</span>
            <div className="stat-header">
              <span>Hours Spent</span>
            </div>
            <h3>{stats.hoursSpent.toFixed(1)}</h3>
            <p>Learning sessions</p>
          </div>
        </div>

        <div className="dashboard-mid">
		<div className="daily-activity">
  <div className="section-header">
    <h4>Daily Activity</h4>
    <span className="small-text">Last 7 Days</span>
  </div>

  <div className="activity-graph">
    {stats.dailyActivity.length > 0 ? (
      stats.dailyActivity.map(({ day, count }, idx) => (
        <div className="activity-item" key={idx}>
          <div className={`activity-box ${count !== 0 ? "active" : ""}`}>
            <h5>{count}</h5>
            <p>activities</p>
          </div>
          <span className="activity-day">{day}</span>
        </div>
      ))
    ) : (
      <div className="activity-item">
        <div className="activity-box">
          <h5>0</h5>
          <p>No activity</p>
        </div>
        <span className="activity-day">--</span>
      </div>
    )}
  </div>
</div>

         <div className="recent-achievements">
  <div className="section-header">
    <h4>Recent Achievements</h4>
  </div>

  {stats.recentAchievements.length > 0 ? (
    stats.recentAchievements.map((achievement, idx) => (
      <div className="achievement" key={idx}>
        <div className={`ach-icon ${achievement.icon}`}>
          {achievement.icon === 'orange' && <HiOutlineFire />}
          {achievement.icon === 'gray' && <HiOutlineSun />}
          {achievement.icon === 'green' && <HiOutlineBookOpen />}
        </div>
        <div className="ach-details">
          <h5>{achievement.title}</h5>
          <p>{achievement.description}</p>
          <span className={`tag ${achievement.tag}`}>{achievement.tag}</span>
        </div>
      </div>
    ))
  ) : (
    <div className="achievement">
      <div className="ach-icon gray">
        <HiOutlineSun />
      </div>
      <div className="ach-details">
        <h5>Getting Started</h5>
        <p>Complete your first exchange to earn achievements!</p>
        <span className="tag common">common</span>
      </div>
    </div>
  )}
</div>
        </div>

        <div className="dashboard-bottom">
          <div className="learning-goals">
  <div className="section-header">
    <h4>Active Exchanges</h4>
    <a href="#">View All</a>
  </div>

  {stats.totalExchanges > 0 ? (
    <>
      <div className="goal">
        <div className="goal-header">
          <h5>Total Exchanges</h5>
          <span className="goal-percent">{stats.totalExchanges}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.min(100, (stats.totalExchanges / 10) * 100)}%` }}></div>
        </div>
        <div className="goal-meta">
          <span>{stats.activeMatches} active</span>
          <span>{stats.totalExchanges} total</span>
        </div>
      </div>

      <div className="goal">
        <div className="goal-header">
          <h5>Learning Progress</h5>
          <span className="goal-percent">{stats.totalSkills} skills</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.min(100, (stats.totalSkills / 20) * 100)}%` }}></div>
        </div>
        <div className="goal-meta">
          <span>{stats.hoursSpent.toFixed(1)}h learned</span>
          <span>{stats.totalSkills} skills</span>
        </div>
      </div>
    </>
  ) : (
    <div className="goal">
      <div className="goal-header">
        <h5>No active exchanges</h5>
        <span className="goal-percent">0%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: "0%" }}></div>
      </div>
      <div className="goal-meta">
        <span>Start learning today!</span>
      </div>
    </div>
  )}
</div>

          <div className="skill-performance">
            <div className="section-header">
              <h4>Skill Performance</h4>
              <a href="#">View Details</a>
            </div>

            {stats.skillPerformance.length > 0 ? (
              stats.skillPerformance.map((skill, idx) => (
                <div className="skill-item" key={idx}>
                  <div className="skill-header">
                    <h5>{skill.name}</h5>
                    <span className="primary-percent">{skill.percent}%</span>
                  </div>
                  <div className="skill-meta">
                    <span>{skill.hours}h spent · {skill.sessions} sessions</span>
                    <span className="gain">{skill.gain}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="skill-item">
                <div className="skill-header">
                  <h5>No skills yet</h5>
                  <span className="primary-percent">0%</span>
                </div>
                <div className="skill-meta">
                  <span>Start your first exchange!</span>
                </div>
              </div>
            )}

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
