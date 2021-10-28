import axios from "axios";

// Etablir la communication entre backend et frontend grace à l'URL et via la bibliothèque AXIOS
export const getPosts = (post) => axios.get("http://localhost:3000/post");
