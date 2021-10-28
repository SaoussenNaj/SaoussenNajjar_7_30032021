import axios from "axios";

// Etablir la communication entre backend et frontend grace à l'URL et via la bibliothèque AXIOS
export const addComment = (comment) => {
  axios.post("http://localhost:3000//posts/:id", comment);
  export const modifyComment = (comment) =>
    axios.put("http://localhost:3000/post/:id", comment);
  export const deleteComment = (comment) =>
    axios.delete("http://localhost:3000/post/:id", comment);
};
