import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';

function CourseDetails() {
  usePageMeta('Course Details');
  return (
    <div className="page-container">
      <h1>Course Details</h1>
      <p>Details for a specific course will go here.</p>
    </div>
  );
}

export default CourseDetails;
