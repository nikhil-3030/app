import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPost = async (post: { title: string; body: string; userId: number }) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};

export const updatePost = async (id: number, post: { title: string; body: string; userId: number }) => {
  const response = await axios.put(`${API_URL}/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};