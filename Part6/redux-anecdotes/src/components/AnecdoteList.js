import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const anecdoteList = anecdotes.slice();
    if (filter === null) {
      return anecdoteList.sort((a, b) => b.votes - a.votes);
    }

    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(showNotification(`You voted '${content}'`));
  };
  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
