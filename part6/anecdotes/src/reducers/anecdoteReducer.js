import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../service/anecdotes";

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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createNew(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.addVote(id);
    dispatch(addVote(id));
  };
};

export default anecdoteReducer;
