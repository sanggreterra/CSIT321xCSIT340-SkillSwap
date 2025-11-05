import React from "react";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import "./AllCourses.css";

const sampleCourses = [
  {
    id: 1,
    author: "User-1",
    title: "Creating Design Skills with AI Tools",
    duration: "2 Weeks",
    level: "Intermediate",
    image: "/images/course-1.jpg",
  },
  {
    id: 2,
    author: "User-2",
    title: "Resume and Interview for Career Advancement",
    duration: "1 Week",
    level: "Beginner-Intermediate",
    image: "/images/course-2.jpg",
  },
  {
    id: 3,
    author: "User-3",
    title: "Modern Tools using MS Office",
    duration: "1 Week",
    level: "Beginner",
    image: "/images/course-3.jpg",
  },
  {
    id: 4,
    author: "User-4",
    title: "Basic Audio & Video Production for Film Students",
    duration: "3 Weeks",
    level: "Beginner-Intermediate",
    image: "/images/course-4.jpg",
  },
  {
    id: 5,
    author: "User-5",
    title: "3D Rendering for Printing and Fabrication",
    duration: "1 Week",
    level: "Advanced",
    image: "/images/course-5.jpg",
  },
  {
    id: 6,
    author: "User-6",
    title: "Making a 3D VTuber Model for Content Creators",
    duration: "2-3 Weeks",
    level: "Beginner-Advanced",
    image: "/images/course-6.jpg",
  },
];

export default function AllCourses() {
  return (
    <>
      <Header />

      <main className="all-courses-page">
        <div className="container page-inner">
          <header className="all-courses-header">
            <div>
              <h2 className="page-title">All Skill Courses</h2>
              <p className="page-sub">Explore our Popular Courses</p>
            </div>
            <button className="filter-btn">Filter</button>
          </header>

          <section className="courses-grid">
            {sampleCourses.map((c) => (
              <article className="course-card" key={c.id}>
                <div className="card-media">
                  <img
                    src={c.image}
                    alt={c.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/600x360?text=Course+Image";
                    }}
                  />
                </div>

                <div className="card-body">
                  <p className="card-author">
                    by <span>{c.author}</span>
                  </p>

                  <h3 className="card-title">{c.title}</h3>

                  <div className="card-meta">
                    <div className="meta-item">
                      <span className="meta-dot" /> {c.duration}
                    </div>
                    <div className="meta-item">{c.level}</div>
                  </div>

                  <div className="card-footer">
                    <div className="availability">Available</div>
                    <a href={`/courses/${c.id}`} className="details-link">
                      View Details
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
