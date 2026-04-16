import { api } from "./axios";

export const getMyArticles = () => {
  return api.get("/articles/my", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
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

export const reviewArticle = (
  id: string,
  data: {
    status: string;
    feedback?: string;
    file?: File;
  },
) => {
  const formData = new FormData();

  formData.append("status", data.status);

  if (data.feedback) {
    formData.append("feedback", data.feedback);
  }

  if (data.file) {
    formData.append("file", data.file);
  }

  return api.patch(`/articles/${id}/review`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getEditorDashboard = () => {
  return api.get("/articles/editor/dashboard");
};

export const uploadPayment = (id: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/articles/${id}/payment`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
