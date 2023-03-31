import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createNew: (state, action) => {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0,
      });
    },
    addVote: (state, action) => {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      anecdoteToChange.votes += 1;
    },
    appendAnecdotes: (state, action) => {
      state.push(...action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { createNew, addVote, appendAnecdotes, setAnecdotes } =
  anecdotesSlice.actions;
const anecdoteReducer = anecdotesSlice.reducer;
export default anecdoteReducer;
