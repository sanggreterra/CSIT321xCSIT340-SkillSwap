import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesSection.css';

const CategoriesSection = () => {
  const navigate = useNavigate();
  const categories = [
    { name: 'Mathematics & Logic', courses: 30, color: 'secondary', icon: '🧮' },
    { name: 'Business', courses: 52, color: 'success', icon: '💼' },
    { name: 'Finance & Accounting', courses: 33, color: 'warning', icon: '💰' },
    { name: 'IT & Software', courses: 22, color: 'error', icon: '💻' },
    { name: 'Personal Development', courses: 20, color: 'primary', icon: '🎯', featured: true },
    { name: 'Office Productivity', courses: 13, color: 'gray', icon: '📊' },
    { name: 'Marketing', courses: 12, color: 'secondary', icon: '📈' },
    { name: 'Photography & Film', courses: 6, color: 'gray', icon: '📸' },
    { name: 'Lifestyle', courses: 2, color: 'warning', icon: '🌱' },
    { name: 'Multimedia Design', courses: 2, color: 'primary', icon: '🎨' },
    { name: 'Health & Fitness', courses: 16, color: 'success', icon: '💪' },
    { name: 'Music', courses: 9, color: 'warning', icon: '🎵' }
  ];

  const getCategoryClass = (category) => {
    const baseClass = 'category-card';
    const colorClass = `category-${category.color}`;
    const featuredClass = category.featured ? 'category-featured' : '';
    return `${baseClass} ${colorClass} ${featuredClass}`.trim();
  };

  return (
    <section className="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <h2 className="categories-title">Browse top categories</h2>
        </div>
        
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className={getCategoryClass(category)}>
              <div className="category-icon">
                <span className="category-emoji">{category.icon}</span>
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-courses">{category.courses} Courses</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="categories-footer">
          <p className="categories-subtitle">We have more categories & subcategories.</p>
          <button className="browse-all-btn" onClick={() => navigate('/courses')}>
            Browse All
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#00AB55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
