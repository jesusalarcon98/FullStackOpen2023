import { createSlice } from "@reduxjs/toolkit";
import { createNew, changeVote } from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      console.log(updatedAnecdote);
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteAnecdotes = (id) => {
  return async (dispatch) => {
    const newVote = await changeVote(id);
    dispatch(voteAnecdote(newVote));
  };
};
export default anecdoteSlice.reducer;
