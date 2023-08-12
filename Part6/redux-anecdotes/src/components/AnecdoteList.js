import { useDispatch, useSelector } from "react-redux";
import { voteAnecdotes } from "../reducers/anecdoteReducer";
import { notifications } from "../reducers/notificationReducer";

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
    dispatch(voteAnecdotes(id));
    dispatch(notifications(`You voted '${content}'`, 3));
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
