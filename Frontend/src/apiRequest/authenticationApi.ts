// src/services/authService.ts
import axios from "axios";
import config from "../config";

export interface UserPayload {
  username: string;
  email: string;
  password: string;
  userRole: string;
}

interface LoginPayload {
  username: string;
  password: string;
}


export const addUser = async (payload: UserPayload) => {
  const response = await axios.post(`${config.BASE_URL}users/addUser`, payload);
  return response.data;
};


export const loginUser = async (payload: LoginPayload) => {
  const response = await axios.post(`${config.BASE_URL}users/login`, payload);
  return response.data;
};
