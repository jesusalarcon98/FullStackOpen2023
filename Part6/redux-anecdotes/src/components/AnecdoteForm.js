import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { newAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdote(content));
    dispatch(showNotification(`Note '${content}' created`));
  };
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
