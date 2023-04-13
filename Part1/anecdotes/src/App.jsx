import { useState } from "react";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  const randomAnecdote = () => {
    let random = Math.floor(Math.random() * (anecdotes.length - 0) + 0);
    setSelected(random);
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={randomAnecdote}>next anecdote</button>
    </div>
  );
};

export default App;
