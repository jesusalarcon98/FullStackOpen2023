import React from "react";
import Header from "../components/Header";
import CourseContent from "../components/CourseContent";

const Course = ({ course }) => {
  let total = 0;

  return (
    <div>
      <Header header={course.name} />
      {course.parts.map((courses) => {
        total = courses.exercises + total;
        return <CourseContent key={courses.id} parts={courses} />;
      })}
      <b>Total of {total} exercises</b>
    </div>
  );
};

export default Course;
