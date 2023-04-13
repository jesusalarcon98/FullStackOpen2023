import { useState } from "react";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVoted] = useState(new Uint8Array(anecdotes.length));

  console.log(votes);

  const randomAnecdote = () => {
    let random = Math.floor(Math.random() * (anecdotes.length - 0) + 0);
    setSelected(random);
  };

  const addVote = () => {
    let newVote = [...votes];
    newVote[selected] += 1;
    setVoted(newVote);
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={addVote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
    </div>
  );
};

export default App;
