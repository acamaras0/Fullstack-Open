import axios from "axios";
const urlAddress = "https://phonebook-server-rypv.onrender.com";

const getAll = async () => {
  const request = axios.get(urlAddress + '/api/persons');
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(urlAddress + '/api/persons', newObject);
  const response = await request;
  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${urlAddress}/${id}`, newObject);
  const response = await request;
  if (response.status === 404) return "Error. Something went wrong.";
  return response.data;
};

const del = async (id) => {
  const request = axios.delete(`${urlAddress}/${id}`);
  const response = await request;
  return response.data;
};

export default { getAll, create, update, del };
