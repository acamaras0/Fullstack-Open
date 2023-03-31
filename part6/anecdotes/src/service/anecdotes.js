import axios from "axios";

const baseUrl = "http://localhost:3003/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const addVote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const anecdote = response.data;
  const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response2 = await axios.put(`${baseUrl}/${id}`, changedAnecdote);
  return response2.data;
};

export default { getAll, createNew, addVote };
