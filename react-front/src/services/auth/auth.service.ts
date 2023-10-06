import axios from "axios";

const API_URL = "http://localhost:3001/api/authentication/";

export const signUp = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "sign-up", {
    username,
    email,
    password,
  });
};

export const signIn = (email: string, password: string) => {
  return axios
    .post(API_URL + "sign-in", {
      email,
      password,
    })
    .then((response) => {
      return  response.data;
    });
};

