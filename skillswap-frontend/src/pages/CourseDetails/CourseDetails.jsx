import React, { useState } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import Header from '../../components/HomePage/Header';
import Footer from '../../components/HomePage/Footer';
import './CourseDetails.css';

export default function CourseDetails() {
  usePageMeta('Course Details');

  const [activeTab, setActiveTab] = useState('overview');
  const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);

  const sampleCourse = {
    title: 'Making a 3D VTuber Model for Content Creators',
    subtitle:
      '3 in 1 Skill Course: Learn to design 3D rendering with VSeeFace, streaming using OBS Studio, and broadcast using YouTube or Twitch',
    instructor: {
      name: 'Justin de Dios',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=244&h=244&fit=crop&crop=face'
    },
    rating: 4.8,
    ratingCount: 48,
    thumbnail: 'https://i.imgur.com/XX3Ln56.jpg'
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
    name: 'Justin de Dios',
    title: 'Multimedia Artist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=244&h=244&fit=crop&crop=face',
    rating: 4.8,
    mentees: 42,
    courses: 9,
    bio:
      'Kazu Arts is a Multimedia Artist with 20 years of experience in creating multimedia content such as motion graphics, 2D & 3D animation, etc. He is also seeking to learn Marketing and Business Analytics. Available time: 8:00-17:00 (GMT +8) (Except Sundays)',
  };

  const feedbacksInitial = [
    { id: 1, name: 'Gay Hawkins', time: '1 month ago', rating: 5,
      text: 'I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.' },
    { id: 2, name: 'Dianne Russell', time: '2 months ago', rating: 5, 
      text: 'This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgable and I was never getting bored throughout the course. This course meets more than my expectation and, I made the best investment of time to learn and practice what I am passionate about. Thank you so much to our excellent instructor Vako!! Highly recommend this course! Take the next step.' },
    { id: 3, name: 'Eleanor Pena', time: '3 months ago', rating: 4, 
      text: 'Webflow course was good, it coves design secrtes, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me to add web development skills related to webflow in my toolbox. Thank you Vako.' },
    { id: 4, name: 'Alexis Cooper', time: '5 months ago', rating: 5,
      text: 'I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.' },
    { id: 5, name: 'Ralph Edwards', time: '6 months ago', rating: 4,
      text: 'GREAT Course! Instructor was very descriptive and professional. I learned a TON that is going to apply immediately to real life work. Thanks so much, cant wait for the next one!' },
    { id: 6, name: 'Ariana McCoy', time: '7 months ago', rating: 5,
      text: 'This should be one of the best course I ever made about UXUI in Udemy. Highly recommend to those who is new to UXUI and want to become UXUI freelancer!' },
  ];

  const [feedbacks, setFeedbacks] = useState(feedbacksInitial.slice(0, 4));

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
            <div className="course-left">
              {/* Course Title & Instructor */}
              <h1 className="course-title">{sampleCourse.title}</h1>
              <p className="course-sub">{sampleCourse.subtitle}</p>
              <div className="meta-row">
                <div className="instructor">
                  <img src={sampleCourse.instructor.avatar} alt={sampleCourse.instructor.name} className="instructor-avatar" />
                  <div className="instructor-name">{sampleCourse.instructor.name}</div>
                </div>
                <div className="rating">
                  <div className="stars">★★★★★</div>
                  <div className="rating-text">{sampleCourse.rating} <span className="rating-count">({sampleCourse.ratingCount} ratings)</span></div>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="thumbnail-wrap">
                <img src={sampleCourse.thumbnail} alt="Course thumbnail" className="course-thumbnail" />
                <button className="play-btn" aria-label="Play course intro">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#ffffff" opacity="0.95"/>
                    <path d="M9 8.5L16 12L9 15.5V8.5Z" fill="#FF6B3D"/>
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="tabs">
                {['overview', 'curriculum', 'mentor', 'review'].map(tab => (
                  <button
                    key={tab}
                    className={`tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              {activeTab === 'overview' && (
                <section className="section">
                  <h3 className="section-title">Description</h3>
                  <p className="muted">
                    Have you ever dreamed of becoming a VTuber? Imagine bringing your unique avatar to life, connecting with audiences worldwide, and creating engaging content without showing your face. This comprehensive skill course takes you from complete beginner to confident VTuber content creator!
                  </p>
                  <p className="muted">
                    This isn't just about learning software – it's about discovering a new way to express yourself online. Whether you're camera-shy, want creative freedom, or simply love anime aesthetics, VTubing opens up incredible possibilities for content creation. I've helped dozens of aspiring creators launch their VTuber careers, and now it's your turn!
                  </p>
                  <p className="muted">
                    Throughout this course, you'll master the complete VTuber workflow: setting up your 3D model in VSeeFace, configuring professional streaming setups in OBS Studio, and broadcasting to platforms like YouTube and Twitch. No prior experience needed – just bring your creativity and enthusiasm! By the end, you'll have everything you need to start your VTuber journey and join this exciting, growing community.
                  </p>
                  <p className="muted">
                    Why VTubing? It's more than a trend – it's a lifestyle revolution! VTubers enjoy creative freedom, privacy, and the ability to embody any character they imagine. The VTubing community is welcoming, supportive, and constantly growing. This is your chance to be part of something special!
                  </p>

                  <section className="section learn-box">
                    <h4 className="learn-title">What you will learn in this skill swapping course</h4>
                    <ul className="learn-list">
                      {learnPoints.map((p, i) => <li key={i}><span className="check">✓</span>{p}</li>)}
                    </ul>
                  </section>
                </section>
              )}

              {activeTab === 'curriculum' && (
                <section className="section">
                  <h3>Curriculum</h3>
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
                          <tr><th>Date</th><th>Time</th><th>Topic</th><th>Duration</th></tr>
                        </thead>
                        <tbody>
                          {scheduleRows.map((r, i) => (
                            <tr key={i}>
                              <td>{r.date}</td><td>{r.time}</td><td>{r.topic}</td><td>{r.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </section>
              )}

              {activeTab === 'mentor' && (
			  <section className="section">
			  <h3>Mentor</h3>
			  <div class="mentor-card">
			    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=244&h=244&fit=crop&crop=face" 
				alt="Justin de Dios" 
				class="mentor-avatar-large" />
				<div class="mentor-info">
					<h3 class="mentor-name">{mentor.name}</h3>
					<p class="mentor-title">{mentor.title}</p>
					<div class="mentor-meta">
						<span class="meta-pill">⭐ {mentor.rating} Rating</span>
						<span class="meta-pill">👥 {mentor.mentees} Mentees</span>
						<span class="meta-pill">🎓 {mentor.courses} Courses</span>
					</div>
					<p class="mentor-bio">
					{mentor.bio} </p>
					</div>
				</div>
				</section>




)}


              {activeTab === 'review' && (
                <section className="section feedback-section">

                  <div className="feedback-header">
                    <h3>Students Feedback</h3>
                    <select className="rating-filter">
                      <option>All ratings</option>
                      <option>5 star</option>
                      <option>4 star</option>
                    </select>
                  </div>

                  <div className="feedback-list">
                    {feedbacks.map(f => (
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
              )}

            </div>

            {/* Sidebar */}
            <aside className="course-right">
              <div className="inquiry-card">
                <h3>Skill Inquiry</h3>
                <div className="specs">
                  <h4><strong>Technical Specifications</strong></h4>
                  <div className="spec-row"><p>Difficulty:</p><span><strong>Intermediate</strong></span></div>
                  <div className="spec-row"><p>Duration:</p><span><strong>5 weeks (7 hours total)</strong></span></div>
                  <div className="spec-row"><p>Format:</p><span><strong>Live + Sessions</strong></span></div>
				  <div className="spec-row"><p>Prerequisites:</p><span><strong>Basic Computer Skills</strong></span></div>
                  <div className="spec-row"><p>Requirements</p><span><strong>VSeeFace, OBS Studio</strong></span></div>
                </div>

                <div className="times">
                  <h4>Available Time Slots</h4>
                  <div className="time-item"><p>Weekday Mornings</p> <span>Mon-Fri 9:00 AM - 11:00 AM</span></div>
                  <div className="time-item"><p>Weekday Evenings</p> <span>Mon-Fri 6:00 PM - 8:00 PM</span></div>
                  <div className="time-item"><p>Weekends</p> <span>Sat, Sun 10:00 AM - 4:00 PM</span></div>
                </div>

                <button className="btn-primary inquiry-cta">Send Inquiry</button>

                <div className="small-note muted">
                  <strong>Skill Exchange Info</strong>
                  <p>This course may be arranged as one-on-one or group sessions. Message the mentor for availability.</p>
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
