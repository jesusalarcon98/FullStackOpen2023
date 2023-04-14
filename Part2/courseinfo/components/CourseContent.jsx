import Parts from "./Parts";

const CourseContent = ({ parts }) => {
  return (
    <div>
      <Parts name={parts.name} exercises={parts.exercises} />
    </div>
  );
};

export default CourseContent;
