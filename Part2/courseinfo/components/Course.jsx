import React from "react";
import Header from "../components/Header";
import CourseContent from "../components/CourseContent";

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      {course.parts.map((courses) => {
        return <CourseContent key={courses.id} parts={courses} />;
      })}
    </div>
  );
};

export default Course;
