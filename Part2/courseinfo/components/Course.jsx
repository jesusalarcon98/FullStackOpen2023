import React from "react";
import Header from "../components/Header";
import CourseContent from "../components/CourseContent";
import Total from "../components/Total";

const Course = ({ course }) => {
  return (
    <div>
      {course.map((courses) => {
        return (
          <div key={courses.id}>
            <Header header={courses.name} />
            <CourseContent parts={courses.parts} />
            <Total total={courses.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;
