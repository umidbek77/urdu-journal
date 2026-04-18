import { api } from "./axios";

export const getIssues = () => {
  return api.get("/issues");
};