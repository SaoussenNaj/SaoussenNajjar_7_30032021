import axios from "axios";

// Etablir la communication entre backend et frontend grace à l'URL et via la bibliothèque AXIOS
export const login = (user) =>
  axios.post("http://localhost:3000/api/auth/login", user);

export const signup = (user) =>
  axios.post("http://localhost:3000/api/auth/signup", user);

export const getAdmins = () =>
  axios.get("http://localhost:3000/api/auth/admin", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getUser = () =>
  axios.get("http://localhost:3000/api/auth/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const deleteUser = (password) =>
  axios.delete("http://localhost:3000/api/auth/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      password,
    },
  });
