import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-image">
          {/* Background decorative elements */}
          <div className="ellipse ellipse-1"></div>
          <div className="ellipse ellipse-2"></div>
          <div className="ellipse ellipse-3"></div>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Learn Skills from Real People</h1>
          <div className="hero-description">
            <p className="hero-subtitle">
              SkillSwap connects you with people in your community who want to share their knowledge and learn from yours. No expensive courses, no impersonal videos - just real people teaching real skills through meaningful exchanges.
            </p>
            <button className="hero-cta" onClick={() => navigate('/signup')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="white"/>
                <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="white"/>
              </svg>
              Inquire Now
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
