import axios from "axios";

// Etablir la communication entre backend et frontend grace à l'URL et via la bibliothèque AXIOS
export const addComment = (id, comment) =>
  axios.post(`http://localhost:3000/api/comments/${id}`, comment, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const modifyComment = (id, comment) =>
  axios.put(`http://localhost:3000/api/comments/${id}`, comment, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const deleteComment = (id) =>
  axios.delete(`http://localhost:3000/api/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
