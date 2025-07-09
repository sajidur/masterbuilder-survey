// src/services/authService.ts
import axios from "axios";

const baseURL = "http://192.168.5.171:3000/"

interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await axios.post(`${baseURL}users/login`, payload);
  return response.data;
};
