import { api } from "./axios";

export const login = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/auth/login", data);
};

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", data);
};