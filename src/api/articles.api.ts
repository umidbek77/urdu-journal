import { api } from "./axios";

export const getMyArticles = () => {
  return api.get("/articles/my");
};

export const uploadArticle = (file: File) => {

  const formData = new FormData();
  formData.append("file", file);

  return api.post("/articles/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const submitArticle = (data: {
  title: string;
  abstract: string;
  keywords: string;
  fileUrl: string;
}) => {
  return api.post("/articles/submit", data);
};

export const getSubmittedArticles = () => {
  return api.get("/articles/submitted");
};

export const reviewArticle = (id: string, data: any) => {
  return api.patch(`/articles/${id}/review`, data);
};

export const getEditorDashboard = () => {
  return api.get("/articles/editor/dashboard");
};