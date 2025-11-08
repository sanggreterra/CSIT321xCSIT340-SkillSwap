import React from 'react';
import './LatestBlogs.css';

const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'FabFest 2025: the Philippine Fablab Festival',
      date: 'August 29, 2025',
      description: 'With the theme "High Five: Bridging Gaps Through Innovation and Collaboration," this year\'s festival brings together MSMEs, creatives, makers, startups, and innovators for two days of learning, sharing, and hands-on experiences.',
      image: 'https://i.imgur.com/cThcJEk.jpg'
    },
    {
      id: 2,
      title: 'UXPH Mini 2025: Design for the Future',
      date: 'September 30, 2025',
      description: 'UXPH Mini is a grassroots event that brings design conversations and diverse learning opportunities to the creative communities across the islands.',
      image: 'https://i.imgur.com/lpCqsNU.jpg'
    },
    {
      id: 3,
      title: 'How to Ace Hackatons',
      date: 'October 1, 2025',
      description: 'Hackathons aren\'t just for show. They\'ve birthed real products, startups, and features you probably use.',
      image: 'https://i.imgur.com/iuKdhkh.jpg'
    }
  ];

  return (
    <section className="latest-blogs">
      <div className="blogs-container">
        <div className="blogs-header">
          <h2 className="blogs-title">Latest Blogs</h2>
          <p className="blogs-subtitle">Explore news about skill development</p>
        </div>
        
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <div className="blog-meta">
                  <div className="blog-date">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2Z" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 0V4M10 0V4M2 6H14" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{blog.date}</span>
                  </div>
                </div>
                <p className="blog-description">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
