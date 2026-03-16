import { api } from "./axios";

export const getAdminDashboard = () => {
  return api.get("/admin/dashboard");
};

export const getEditors = () => {
  return api.get("/admin/editors");
};

export const createEditor = (data:any) => {
  return api.post("/admin/editors", data);
};

export const deleteEditor = (id:string) => {
  return api.delete(`/admin/editors/${id}`);
};

export const getUsers = () => {
  return api.get("/admin/users");
};

export const getAcceptedArticles = () => {
  return api.get("/articles/accepted");
};

export const publishArticle = (id:string, issueId:string) => {
  return api.patch(`/articles/${id}/publish/${issueId}`);
};