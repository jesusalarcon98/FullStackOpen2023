import Parts from "./Parts";

const CourseContent = ({ parts }) => {
  return <Parts name={parts.name} exercises={parts.exercises} />;
};

export default CourseContent;
