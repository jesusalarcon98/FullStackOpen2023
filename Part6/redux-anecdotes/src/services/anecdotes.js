import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNew = async (content) => {
  const object = { content, id: getId(), votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

export const changeVote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`);
  const object = anecdote.data;
  const vote = { ...object, votes: object.votes + 1 };
  const request = await axios.put(`${baseUrl}/${id}`, vote);
  return request.data;
};
