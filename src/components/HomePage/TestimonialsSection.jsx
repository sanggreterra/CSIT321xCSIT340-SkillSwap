import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Mira Santos',
      title: 'Accountancy Student',
      text: 'SkillSwap helped me gain real-world insight into the industry. My mentor guided me patiently and shared techniques I couldn’t have learned from school alone.',
      avatar: 'https://images.unsplash.com/photo-1590702841774-45166f031529?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
    },
    {
      id: 2,
      name: 'Eli Tan',
      title: 'Junior Developer',
      text: 'I really enjoyed how interactive the mentoring sessions were. My mentor gave me honest feedback and practical advice that boosted my confidence as a developer.',
      avatar: 'https://images.unsplash.com/photo-1686543972602-da0c7ea61ce2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
    },
    {
      id: 3,
      name: 'Rina Park',
      title: 'Startup Artist',
      text: 'SkillSwap made learning fun and inspiring! I met creative people who encouraged me to push my ideas further and build a stronger artistic portfolio.',
      avatar: 'https://images.unsplash.com/photo-1724134619553-84dea553f0ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
    },
    {
      id: 4,
      name: 'Noah Dela Cruz',
      title: 'IT Student',
      text: 'The skills I learned here were crucial for my growth. My mentor genuinely cared about my progress and helped me apply my knowledge in real projects.',
      avatar: 'https://images.unsplash.com/photo-1618616153864-f1251396e07a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Mentee feedbacks</h2>
          <p className="testimonials-subtitle">What Mentees Say About SkillSwap</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-avatar">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
              <div className="testimonial-author">
                <h3 className="author-name">{testimonial.name}</h3>
                <p className="author-title">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
