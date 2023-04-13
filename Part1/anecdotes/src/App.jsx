import { useState } from "react";

const Button = ({ click, text }) => {
  return <button onClick={click}>{text}</button>;
};

const Anecdote = ({ text, votes, selected }) => {
  return (
    <div>
      <h1>{text}</h1>
      <p>{votes}</p>
      <p>has {selected} votes</p>
    </div>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVoted] = useState(new Uint8Array(anecdotes.length));

  const randomAnecdote = () => {
    let random = Math.floor(Math.random() * (anecdotes.length - 0) + 0);
    setSelected(random);
  };

  const addVote = () => {
    let newVote = [...votes];
    newVote[selected] += 1;
    setVoted(newVote);
  };

  const maxVoted = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Anecdote
        text="Anecdote of the day"
        votes={anecdotes[selected]}
        selected={votes[selected]}
      />
      <Button click={addVote} text="vote" />
      <Button click={randomAnecdote} text="next anecdote" />
      <Anecdote
        text="Anecdote with most votes"
        votes={anecdotes[maxVoted]}
        selected={Math.max(...votes)}
      />
    </div>
  );
};

export default App;
