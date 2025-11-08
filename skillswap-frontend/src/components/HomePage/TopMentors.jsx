import React from 'react';
import './TopMentors.css';

const TopMentors = () => {
  const mentors = [
    {
      id: 1,
      name: 'Justin de Dios',
      title: 'Production Designer',
      rating: 4.6,
      mentees: 10,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=244&h=244&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Jason Smith',
      title: 'Business Analyst',
      rating: 4.9,
      mentees: 14,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=244&h=244&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Grace Ling',
      title: 'UI/UX Designer',
      rating: 4.8,
      mentees: 42,
      image: 'https://images.unsplash.com/photo-1735424080768-8730f9c8a0e9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
    },
    {
      id: 4,
      name: 'Alisson Doe',
      title: 'Multimedia Artist',
      rating: 4.7,
      mentees: 21,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=244&h=244&fit=crop&crop=face'
    }
  ];

  return (
    <section className="top-mentors">
      <div className="mentors-container">
        <div className="mentors-header">
          <h2 className="mentors-title">Top Mentors of the month</h2>
          <p className="mentors-subtitle">What Mentors Say About SkillSwap</p>
        </div>
        
        <div className="mentors-grid">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <div className="mentor-image">
                <img src={mentor.image} alt={mentor.name} />
              </div>
              <div className="mentor-info">
                <h3 className="mentor-name">{mentor.name}</h3>
                <p className="mentor-title">{mentor.title}</p>
              </div>
              <div className="mentor-divider"></div>
              <div className="mentor-stats">
                <div className="mentor-rating">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0L12.5 6.5L20 7.5L15 12.5L16.5 20L10 16.5L3.5 20L5 12.5L0 7.5L7.5 6.5L10 0Z" fill="#FFD700"/>
                  </svg>
                  <span className="rating-value">{mentor.rating}</span>
                </div>
                <div className="mentor-mentees">
                  <span className="mentees-count">{mentor.mentees}</span>
                  <span className="mentees-label">mentees</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopMentors;
