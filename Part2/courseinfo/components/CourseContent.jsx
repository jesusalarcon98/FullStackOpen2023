import Parts from "./Parts";

const CourseContent = ({ parts }) => {
  console.log("parts", parts);
  return (
    <div>
      {parts.map((part) => {
        return (
          <Parts key={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
    </div>
  );
};

export default CourseContent;
