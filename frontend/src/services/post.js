import axios from "axios";

// Etablir la communication entre backend et frontend grace à l'URL et via la bibliothèque AXIOS
export const getPosts = (post) => axios.get("http://localhost:3000/post", post);
export const createPost = (post) =>
  axios.post("http://localhost:3000/post", post);
export const modifyPost = (post) =>
  axios.put("http://localhost:3000/post/:id", post);
export const deletePost = (post) =>
  axios.delete("http://localhost:3000/post/:id", post);
