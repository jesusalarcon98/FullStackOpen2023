import React from "react";
import ReactDOM from "react-dom/client";

const Hello = (props) => {
  return (
    <p>
      Hello {props.name}, you are {props.age} years old
    </p>
  );
};

const App = () => {
  const name = "Jesús";
  const age = 10;
  return (
    <div>
      <h1>Greeting</h1>
      <Hello name={name} age={age} />
      <Hello name="Juan" age={12 + 20} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export default App;
