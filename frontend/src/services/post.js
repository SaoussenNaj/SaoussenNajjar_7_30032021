import axios from "axios";

// Etablir la communication entre backend et frontend grace à l'URL et via la bibliothèque AXIOS
export const getPosts = () =>
  axios.get("http://localhost:3000/api/posts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const getPostById = (id) =>
  axios.get(`http://localhost:3000/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const createPost = (post) =>
  axios.post("http://localhost:3000/api/posts", post, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const modifyPost = (id, post) =>
  axios.put(`http://localhost:3000/api/posts/${id}`, post, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const deletePost = (id) =>
  axios.delete(`http://localhost:3000/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
