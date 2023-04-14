import React from "react";
import Header from "../components/Header";
import CourseContent from "../components/CourseContent";
import Total from "../components/Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      {course.parts.map((courses) => {
        return (
          <div key={courses.id}>
            <div>
              <CourseContent parts={courses} />
            </div>
          </div>
        );
      })}
      <Total total={course} />
    </div>
  );
};

export default Course;
