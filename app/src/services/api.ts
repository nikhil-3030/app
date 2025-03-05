import axios from 'axios';
import { Post } from '../types/post';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await axios.post(`${API_BASE_URL}/posts`, post);
  return response.data;
};

export const updatePost = async (id: number, post: Partial<Post>): Promise<Post> => {
  const response = await axios.put(`${API_BASE_URL}/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/posts/${id}`);
};