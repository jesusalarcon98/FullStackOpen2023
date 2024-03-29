import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import axios from "axios";
import { useQuery } from "react-query";

const App = () => {
  const result = useQuery("anecdotes", () =>
    axios.get("http://localhost:3001/anecdotes").then((res) => res.data)
  );
  console.log(result);

  if (result.isLoading) {
    return <div>loading data</div>;
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  /*  const anecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 0,
    },
  ]; */

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
