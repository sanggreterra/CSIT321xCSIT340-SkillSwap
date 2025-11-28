import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/HomePage/Header";
import SignedHeader from "./components/HomePage/SignedHeader";
import Footer from "./components/HomePage/Footer";
import HeroSection from "./components/HomePage/HeroSection";
import CategoriesSection from "./components/HomePage/CategoriesSection";
import FeaturedCourses from "./components/HomePage/FeaturedCourses";
import TopMentors from "./components/HomePage/TopMentors";
import StatisticsSection from "./components/HomePage/StatisticsSection";
import AboutSection from "./components/HomePage/AboutSection";
import TestimonialsSection from "./components/HomePage/TestimonialsSection";
import LatestBlogs from "./components/HomePage/LatestBlogs";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import AllCourses from "./pages/AllCourses/AllCourses";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import Logout from "./pages/Logout/Logout";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { usePageMeta } from "./hooks/usePageMeta";
import "./App.css";

function App() {
  const HomePage = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
      <>
        {usePageMeta("Home")}
        {isLoggedIn ? <SignedHeader /> : <Header />}
        <HeroSection />
        <CategoriesSection />
        <FeaturedCourses />
        <TopMentors />
        <StatisticsSection />
        <AboutSection />
        <TestimonialsSection />
        <LatestBlogs />
        <Footer />
      </>
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={
			  <ProtectedRoute>
			  <Logout />
			  </ProtectedRoute>
			  } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
