import { useState } from "react";
import "./App.css";

function App({ anecdotes }) {
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * (anecdotes.length - 0) + 0)
  );
  console.log(selected);
  return <div>{anecdotes[selected]}</div>;
}

export default App;
