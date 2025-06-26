// src/services/authService.ts
import axios from "axios";

const baseURL = "http://localhost:3000/"

interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await axios.post(`${baseURL}users/login`, payload);
  return response.data;
};
