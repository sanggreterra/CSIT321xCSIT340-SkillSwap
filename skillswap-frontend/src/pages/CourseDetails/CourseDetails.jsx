import React, { useState } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import Header from '../../components/HomePage/Header';
import Footer from '../../components/HomePage/Footer';
import './CourseDetails.css';

const sampleCourse = {
  id: 1,
  title: 'Making a 3D VTuber Model for Content Creators',
  subtitle:
    '3 in 1 Skill Course: Learn to design 3D rendering with VSeeFace, streaming using OBS Studio, and broadcast using YouTube or Twitch',
  instructor: {
    name: 'Kazu Arts',
    avatar: 'https://i.imgur.com/0y8Ftya.png'
  },
  rating: 4.8,
  ratingCount: 48,
  thumbnail: 'https://i.imgur.com/mJbWNLb.jpg'
};

const learnPoints = [
  'Learn how to sculpt and retopologize a 3D model for use in VTuber rigs',
  'Setup VSeeFace + OBS workflow and stream settings',
  'Rigging basics and facial capture tuning',
  'Export & optimize models for real-time performance',
];

const scheduleRows = [
  { date: 'January 3, 2025', time: '3:00 PM', topic: 'Intro to VTubing', duration: '1 hour' },
  { date: 'January 5, 2025', time: '3:00 PM', topic: 'Face Tracking Setup', duration: '1.5 hours' },
  { date: 'January 7, 2025', time: '3:00 PM', topic: 'Rigging Basics', duration: '2 hours' },
  { date: 'January 9, 2025', time: '3:00 PM', topic: 'OBS & Streaming', duration: '1.5 hours' },
];

const mentor = {
  name: 'Kazu Arts',
  title: 'Multimedia Artist',
  avatar: 'https://i.imgur.com/0y8Ftya.png',
  rating: 4.8,
  mentees: 42,
  courses: 9,
  bio:
    'Kazu is a Multimedia Artist with 10+ years experience creating interactive content and realtime avatars. Available Mon-Fri 6:00-9:00 PM (GMT+8).',
};

const feedbacksInitial = [
  { id: 1, name: 'Gay Hawkins', time: '1 month ago', rating: 5, text: 'Great course — very practical and hands-on.' },
  { id: 2, name: 'Dianne Russell', time: '2 months ago', rating: 5, text: 'Instructor is clear and helpful; loved the OBS walkthrough.' },
  { id: 3, name: 'Eleanor Pena', time: '3 months ago', rating: 4, text: 'Good content — wish there was a bit more on retopology.' },
  { id: 4, name: 'Alexis Cooper', time: '5 months ago', rating: 5, text: 'Excellent resources and mentor support.' },
  { id: 5, name: 'Ralph Edwards', time: '6 months ago', rating: 4, text: 'Solid course, very actionable.' },
  { id: 6, name: 'Ariana McCoy', time: '7 months ago', rating: 5, text: 'Highly recommended for beginners.' },
];

export default function CourseDetails() {
  usePageMeta('Course Details');
  const [activeTab, setActiveTab] = useState('overview');
  const [feedbacks, setFeedbacks] = useState(feedbacksInitial.slice(0, 4));
  const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);

  const loadMore = () => {
    setFeedbacks(feedbacksInitial);
    setShowAllFeedbacks(true);
  };

  return (
    <>
      <Header />
      <main className="course-page">
        <div className="container course-inner">
          <div className="course-grid">
            {/* LEFT COLUMN */}
            <div className="course-left">
              <h1 className="course-title">{sampleCourse.title}</h1>
              <p className="course-sub">{sampleCourse.subtitle}</p>

              <div className="meta-row">
                <div className="instructor">
                  <img src={sampleCourse.instructor.avatar} alt={sampleCourse.instructor.name} className="instructor-avatar" />
                  <div>
                    <div className="instructor-name">{sampleCourse.instructor.name}</div>
                  </div>
                </div>

                <div className="rating">
                  <div className="stars">★★★★★</div>
                  <div className="rating-text">{sampleCourse.rating} <span className="rating-count">({sampleCourse.ratingCount} ratings)</span></div>
                </div>
              </div>

              <div className="thumbnail-wrap">
                <img src={sampleCourse.thumbnail} alt="Course thumbnail" className="course-thumbnail" />
                <button className="play-btn" aria-label="Play course intro">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#ffffff" opacity="0.95"/><path d="M9 8.5L16 12L9 15.5V8.5Z" fill="#FF6B3D"/></svg>
                </button>
              </div>

              <div className="tabs">
                <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                <button className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`} onClick={() => setActiveTab('curriculum')}>Curriculum</button>
                <button className={`tab ${activeTab === 'mentor' ? 'active' : ''}`} onClick={() => setActiveTab('mentor')}>Mentor</button>
                <button className={`tab ${activeTab === 'review' ? 'active' : ''}`} onClick={() => setActiveTab('review')}>Review</button>
              </div>

              {activeTab === 'overview' && (
                <>
                  <section className="section">
                    <h3 className="section-title">Description</h3>
                    <p className="muted">
                      Here you can learn to become a VTuber. This comprehensive course walks you through model design, rigging, and streaming setup with practical examples.
                    </p>
                    <p className="muted">
                      This course includes hands-on demos, export optimisation and streaming tips. You’ll be able to produce your own VTuber model and stream with confidence.
                    </p>
                  </section>

                  <section className="section learn-box">
                    <h4 className="learn-title">What you will learn in this skill swapping course</h4>
                    <ul className="learn-list">
                      {learnPoints.map((p, i) => (
                        <li key={i}><span className="check">✓</span>{p}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="section">
                    <h4 className="section-subtitle">Who this skill course is for:</h4>
                    <ul className="plain-list">
                      <li>Aspiring content creators who want to build a VTuber persona</li>
                      <li>Streamers who want to improve their production quality</li>
                      <li>Animators and artists who want real-time performance rigs</li>
                    </ul>
                  </section>

                  <section className="section">
                    <h4 className="section-subtitle">Minimum Requirements</h4>
                    <ul className="plain-list links">
                      <li><a href="#">VSeeFace</a></li>
                      <li><a href="#">OBS Studio</a></li>
                      <li><a href="#">Windows 10/11</a></li>
                    </ul>
                  </section>

                  <section className="section">
                    <h4 className="section-subtitle">Daily / Weekly Schedule</h4>
                    <div className="table-wrap">
                      <table className="schedule-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Topic</th>
                            <th>Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scheduleRows.map((r, i) => (
                            <tr key={i}>
                              <td>{r.date}</td>
                              <td>{r.time}</td>
                              <td>{r.topic}</td>
                              <td>{r.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="section">
                    <h4 className="section-subtitle">Skill Course Mentor</h4>
                    <div className="mentor-card">
                      <img src={mentor.avatar} alt={mentor.name} className="mentor-avatar-large" />
                      <div className="mentor-info">
                        <div className="mentor-name">{mentor.name}</div>
                        <div className="mentor-meta">
                          <span className="meta-pill">★ {mentor.rating}</span>
                          <span className="meta-pill">👥 {mentor.mentees} mentees</span>
                          <span className="meta-pill">▶ {mentor.courses} courses</span>
                        </div>
                        <p className="mentor-bio">{mentor.bio}</p>
                      </div>
                    </div>
                  </section>

                  <section className="section rating-section">
                    <h4 className="section-subtitle">Skill Course Rating</h4>
                    <div className="rating-overview">
                      <div className="rating-score">
                        <div className="score-number">4.8</div>
                        <div className="score-stars">★★★★★</div>
                        <div className="score-label">Skill Course Rating</div>
                      </div>

                      <div className="rating-bars">
                        {[
                          { stars: 5, pct: 76 },
                          { stars: 4, pct: 21 },
                          { stars: 3, pct: 3 },
                          { stars: 2, pct: 0.5 },
                          { stars: 1, pct: 0.5 },
                        ].map((r, i) => (
                          <div className="bar-row" key={i}>
                            <div className="bar-label">
                              <div className="small-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                              <div className="label-text">{r.stars} star</div>
                            </div>
                            <div className="bar-visual">
                              <div className="bar-filled" style={{ width: `${r.pct}%` }} />
                            </div>
                            <div className="bar-pct">{r.pct}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="section feedback-section">
                    <div className="feedback-header">
                      <h4>Students Feedback</h4>
                      <select className="rating-filter">
                        <option>All ratings</option>
                        <option>5 star</option>
                        <option>4 star</option>
                      </select>
                    </div>

                    <div className="feedback-list">
                      {feedbacks.map((f) => (
                        <div className="feedback-item" key={f.id}>
                          <img src={`https://i.pravatar.cc/40?u=${f.id}`} className="feedback-avatar" alt={f.name} />
                          <div className="feedback-body">
                            <div className="feedback-top">
                              <strong>{f.name}</strong>
                              <span className="feedback-time">{f.time}</span>
                            </div>
                            <div className="feedback-stars">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</div>
                            <p>{f.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {!showAllFeedbacks && (
                      <div className="load-more-wrap">
                        <button className="btn btn-outline" onClick={loadMore}>Load more</button>
                      </div>
                    )}
                  </section>
                </>
              )}

              {activeTab === 'curriculum' && (
                <section className="section">
                  <h3>Curriculum</h3>
                  <p className="muted">Curriculum placeholder — list of lessons, videos and resources.</p>
                </section>
              )}

              {activeTab === 'mentor' && (
                <section className="section">
                  <h3>Mentor</h3>
                  <p className="muted">Mentor details (bio, socials, schedule, contact).</p>
                </section>
              )}

              {activeTab === 'review' && (
                <section className="section">
                  <h3>Reviews</h3>
                  <p className="muted">All student reviews and rating breakdown (see Ratings above).</p>
                </section>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="course-right">
              <div className="inquiry-card">
                <h4>Skill Inquiry</h4>
                <div className="specs">
				<h5><strong>Technical Specifications</strong></h5>
                  <div className="spec-row">Difficulty<span><strong>Intermediate</strong></span></div>
                  <div className="spec-row">Duration<span><strong>5 weeks (7 hours total)</strong></span></div>
                  <div className="spec-row">Format<span>Live + Sessions</span></div>
                  <div className="spec-row">Requirements<span>Basic computer skills</span></div>
                </div>

                <div className="times">
                  <h5>Available Time Slots</h5>
                  <div className="time-item">Weekday Mornings — 9:00 - 11:00 AM</div>
                  <div className="time-item">Weekday Evenings — 6:00 - 8:00 PM</div>
                  <div className="time-item">Weekend — Sat 10:00 AM - 1:00 PM</div>
                </div>

                <button className="btn-primary inquiry-cta">Send Inquiry</button>

                <div className="small-note muted">
                  <strong>Skill Exchange Info</strong>
                  <p className="muted">This course may be arranged as one-on-one or group sessions. Message the mentor for availability.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
