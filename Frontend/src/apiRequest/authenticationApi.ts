// src/services/authService.ts
import axios from "axios";
import config from "../config";


interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await axios.post(`${config.BASE_URL}users/login`, payload);
  return response.data;
};
