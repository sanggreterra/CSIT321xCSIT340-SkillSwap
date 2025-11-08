import React from 'react';
import './StatisticsSection.css';

const StatisticsSection = () => {
  const stats = [
    { number: '1K+', label: 'Active Students' },
    { number: '100', label: 'Total Courses' },
    { number: '24', label: 'Instructors' },
    { number: '100%', label: 'Satisfaction rate' }
  ];

  return (
    <section className="statistics-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3 className="stat-number">{stat.number}</h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
