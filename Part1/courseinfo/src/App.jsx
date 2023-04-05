import "./App.css";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.parts} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part parts={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part parts={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.total[0].exercises +
        props.total[1].exercises +
        props.total[2].exercises}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts} />
    </div>
  );
};
export default App;
