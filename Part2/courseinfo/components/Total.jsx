const Total = ({ total }) => {
  const totalExercises = total.reduce((accumulated, currentValue) => {
    return accumulated + currentValue.exercises;
  }, 0);
  return <b>Total of {totalExercises} exercises</b>;
};

export default Total;
