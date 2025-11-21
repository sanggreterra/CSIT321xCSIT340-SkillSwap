import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import { usePageMeta } from "../../hooks/usePageMeta";
import coursesData from "../../data/coursesData";
import "./CourseDetails.css";

export default function CourseDetails() {
  usePageMeta("Course Details");

  const { id } = useParams();
  const course = coursesData.find(c => c.id === parseInt(id));

  const [activeTab, setActiveTab] = useState("overview");
  const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);
  const [feedbacks, setFeedbacks] = useState(course ? course.feedbacks.slice(0, 4) : []);

  if (!course) return <div className="e404">Course not found</div>;

  const loadMore = () => {
    setFeedbacks(course.feedbacks);
    setShowAllFeedbacks(true);
  };

  return (
    <>
      <Header />
      <main className="course-page">
        <div className="container course-inner">
          <div className="course-grid">
            <div className="course-left">
              <h1 className="course-title">{course.title}</h1>
              <p className="course-sub">{course.subtitle}</p>

              <div className="thumbnail-wrap">
                <img
                  src={course.image || course.thumbnail}
                  alt="Course thumbnail"
                  className="course-thumbnail"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/600x360?text=Course+Image";
                  }}
                />
                <button className="play-btn" aria-label="Play course intro">
                  <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#ffffff" opacity="0.95"/>
                    <path d="M9 8.5L16 12L9 15.5V8.5Z" fill="#FF6B3D"/>
                  </svg>
                </button>
              </div>

              <div className="tabs">
                {["overview", "curriculum", "mentor", "review"].map(tab => (
                  <button
                    key={tab}
                    className={`tab ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {activeTab === "overview" && (
                <section className="section">
                  <h3 className="section-title">Description</h3>
                  {course.description.map((para, i) => (
					<p key={i} className="muted">{para}</p>
					))}
                  <section className="section learn-box">
                    <h4 className="learn-title">What you will learn</h4>
                    <ul className="learn-list">
                      {course.learnPoints.map((p, i) => (
                        <li key={i}><span className="check">✓</span>{p}</li>
                      ))}
                    </ul>
                  </section>
                </section>
              )}

              {activeTab === "curriculum" && (
                <section className="section">
                  <h3>Curriculum</h3>
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
                        {course.schedule.map((row, idx) => (
                          <tr key={idx}>
                            <td>{row.date}</td>
                            <td>{row.time}</td>
                            <td>{row.topic}</td>
                            <td>{row.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {activeTab === "mentor" && (
                <section className="section">
                  <h3>Mentor</h3>
                  <div className="mentor-card">
                    <img
                      src={course.mentor.avatar}
                      alt={course.mentor.name}
                      className="mentor-avatar-large"
                    />
                    <div className="mentor-info">
                      <h3 className="mentor-name">{course.mentor.name}</h3>
                      <p className="mentor-title">{course.mentor.title}</p>
                      <div className="mentor-meta">
                        <span className="meta-pill">⭐ {course.mentor.rating} Rating</span>
                        <span className="meta-pill">👥 {course.mentor.mentees} Mentees</span>
                        <span className="meta-pill">🎓 {course.mentor.courses} Courses</span>
                      </div>
                      <p className="mentor-bio">{course.mentor.bio}</p>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === "review" && (
                <section className="section feedback-section">
                  <h3>Student Feedback</h3>
                  {feedbacks.map(f => (
                    <div className="feedback-item" key={f.id}>
                      <img
                        src={`https://i.pravatar.cc/40?u=${f.id}`}
                        alt={f.name}
                        className="feedback-avatar"
                      />
                      <div className="feedback-body">
						<strong>{f.name}</strong> <span className="feedback-time">{f.time}</span>
							<div className="feedback-stars">
							<span className="star filled">{'★'.repeat(f.rating)}</span>
							<span className="star empty">{'☆'.repeat(5 - f.rating)}</span>
							</div>
						<p>{f.text}</p>
						</div>
                    </div>
                  ))}
                  {!showAllFeedbacks && (
                    <button className="btn btn-outline" onClick={loadMore}>
                      Load more
                    </button>
                  )}
                </section>
              )}
            </div>

            <aside className="course-right">
              <div className="inquiry-card">
                <h3>Skill Inquiry</h3>
                <div className="specs">
                  <h4><strong>Technical Specifications</strong></h4>
                  {course.specs.map((spec, idx) => (
                    <div className="spec-row" key={idx}>
                      <p>{spec.label}</p>
                      <span><strong>{spec.value}</strong></span>
                    </div>
                  ))}
                </div>

                <div className="times">
                  <h4>Available Time Slots</h4>
                  {course.times.map((time, idx) => (
                    <div className="time-item" key={idx}>
                      <p>{time.label}</p> <span>{time.value}</span>
                    </div>
                  ))}
                </div>

                <button className="btn-primary inquiry-cta">Send Inquiry</button>

                <div className="small-note muted">
                  <strong>Skill Exchange Info</strong>
                  <p>{course.note}</p>
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
