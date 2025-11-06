import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => {
  const navigate = useNavigate();
  const features = [
    'Smart Matching',
    'Flexible Learning',
    'Community Trust',
    'No Hidden Costs'
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=644&h=469&fit=crop" 
            alt="People learning together" 
          />
        </div>
        <div className="about-content">
          <h2 className="about-title">
            Grow us your skill<br />
            with SkillSwap
          </h2>
          <div className="about-description">
            <p className="about-text">
              It's simple: offer what you know, request what you want to learn, and we'll match you with compatible partners in our community.
            </p>
            <div className="features-list">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#00AB55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button className="about-cta" onClick={() => navigate('/courses')}>
              Browse all skill courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
