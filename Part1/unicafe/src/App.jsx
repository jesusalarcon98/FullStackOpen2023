import { useState } from "react";
import "./index.css";

const Button = ({ text, info }) => {
  return (
    <p>
      {text} {info}
    </p>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const goodStats = () => setGood(good + 1);
  const [neutral, setNeutral] = useState(0);
  const neutralStats = () => setNeutral(neutral + 1);
  const [bad, setBad] = useState(0);
  const badStats = () => setBad(bad + 1);

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <button onClick={goodStats}>good</button>
        <button onClick={neutralStats}>neutral</button>
        <button onClick={badStats}>bad</button>
      </div>
      <div>
        <h1>Statistics</h1>
        <div>
          <Button text="good" info={good} />
          <Button text="neutral" info={neutral} />
          <Button text="bad" info={bad} />
        </div>
      </div>
    </>
  );
}

export default App;
