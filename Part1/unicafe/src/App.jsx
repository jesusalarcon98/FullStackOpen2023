import { useState } from "react";
import "./index.css";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = (good / total) * 100;
  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const Button = ({ clicks, text }) => <button onClick={clicks}>{text}</button>;

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <Button clicks={() => setGood(good + 1)} text="good" />
        <Button clicks={() => setNeutral(neutral + 1)} text="neutral" />
        <Button clicks={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <h1>Statistics</h1>
        <div>
          <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
      </div>
    </>
  );
}

export default App;
