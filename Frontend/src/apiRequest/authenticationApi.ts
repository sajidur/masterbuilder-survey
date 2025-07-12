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

export interface User {
  id: string;      
  username: string;
  email: string;
  userRole: string;
}

export async function getAllUsers(token: string): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(`${config.BASE_URL}users/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
