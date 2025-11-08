import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedCourses.css";

const featuredCourses = [
  {
    id: 1,
    author: "User-1",
    title: "Creating Design Skills with AI Tools",
    duration: "2 Weeks",
    level: "Intermediate",
    status: "Available",
    statusColor: "#55BE24",
    image: "https://i.imgur.com/mJbWNLb.jpg",
  },
  {
    id: 2,
    author: "User-2",
    title: "Resume and Interview for Career Advancement",
    duration: "1 Week",
    level: "Beginner-Intermediate",
    status: "Available",
    statusColor: "#55BE24",
    image: "https://i.imgur.com/5pVGbF0.jpg",
  },
  {
    id: 3,
    author: "User-3",
    title: "Modern Tools using MS Office",
    duration: "1 Week",
    level: "Beginner",
    status: "Available",
    statusColor: "#55BE24",
    image: "https://i.imgur.com/T1TrfDr.jpg",
  },
  {
    id: 4,
    author: "User-4",
    title: "Basic Audio & Video Production for Film Students",
    duration: "3 Weeks",
    level: "Beginner-Intermediate",
    status: "Not Available",
    statusColor: "#BE2424",
    image: "https://i.imgur.com/UhcLcpN.jpg",
  },
  {
    id: 5,
    author: "User-5",
    title: "3D Rendering for Printing and Fabrication",
    duration: "1 Week",
    level: "Advanced",
    status: "Available",
    statusColor: "#55BE24",
    image: "https://i.imgur.com/QOvsis1.jpg",
  },
  {
    id: 6,
    author: "User-6",
    title: "Making a 3D VTuber Model for Content Creators",
    duration: "2-3 Weeks",
    level: "Beginner-Advanced",
    status: "Available",
    statusColor: "#55BE24",
    image: "https://i.imgur.com/XX3Ln56.jpg",
  },
];

export default function FeaturedCourses() {
  const navigate = useNavigate();

  return (
    <section className="featured-courses">
      <div className="featured-inner">
        <header className="featured-header">
          <div>
            <h2 className="page-title">Featured Skill Courses</h2>
            <p className="page-sub">Explore our Popular Skill Courses</p>
          </div>
          <button
            className="all-courses-btn"
            onClick={() => navigate("/courses")}
          >
            All Courses
          </button>
        </header>

        <div className="courses-grid">
          {featuredCourses.map((c) => (
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#00AB55"
                      style={{
                        marginRight: 6,
                        verticalAlign: "middle",
                      }}
                    >
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm.75 5v4.25l3 1.8-.75 1.2L11.25 12V7h1.5Z" />
                    </svg>
                    <span>{c.duration}</span>
                  </div>

                  <div className="meta-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 640 640"
                      fill="#00AB55"
                      style={{
                        marginRight: 6,
                        verticalAlign: "middle",
                      }}
                    >
                      <path d="M80 259.8L289.2 345.9C299 349.9 309.4 352 320 352C330.6 352 341 349.9 350.8 345.9L593.2 246.1C602.2 242.4 608 233.7 608 224C608 214.3 602.2 205.6 593.2 201.9L350.8 102.1C341 98.1 330.6 96 320 96C309.4 96 299 98.1 289.2 102.1L46.8 201.9C37.8 205.6 32 214.3 32 224L32 520C32 533.3 42.7 544 56 544C69.3 544 80 533.3 80 520L80 259.8zM128 331.5L128 448C128 501 214 544 320 544C426 544 512 501 512 448L512 331.4L369.1 390.3C353.5 396.7 336.9 400 320 400C303.1 400 286.5 396.7 270.9 390.3L128 331.4z" />
                    </svg>
                    <span>{c.level}</span>
                  </div>
                </div>

                <hr className="card-divider" />

                <div className="card-footer">
                  <div
                    className="availability"
                    style={{ color: c.statusColor }}
                  >
                    {c.status}
                  </div>
                  <button
                    className="details-link"
                    onClick={() => navigate(`/courses/${c.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
