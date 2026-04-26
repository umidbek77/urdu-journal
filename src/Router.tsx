import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Issues from "./pages/Issues/Issues";
import EditorialBoard from "./pages/EditorialBoard/EditorialBoard";
import ForAuthors from "./pages/ForAuthors/ForAuthors";
import Contacts from "./pages/Contacts/Contacts";
import Page404 from "./pages/Page404/Page404";
import IssueDetail from "./pages/Issues/IssueDetail.tsx";
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import Dashboard from "./pages/Author/Dashboard";
import { ProtectedRoute } from "./guards/ProtectedRoute.tsx";
import MyArticles from "./pages/Author/MyArticles";
import SubmitArticle from "./pages/Author/SubmitArticle";
import Profile from "./pages/Profile/Profile";
import EditorDashboard from "./pages/Editor/Dashboard.tsx";
import EditorArticles from "./pages/Editor/Articles.tsx";
import AdminDashboard from "./pages/Admin/Dashboard.tsx";
import AdminPublish from "./pages/Admin/Publish.tsx";
import AdminEditors from "./pages/Admin/Editors.tsx";
import AdminUsers from "./pages/Admin/Users.tsx";
import AdminIssues from "./pages/Admin/Issues.tsx";
import AdminPublished from "./pages/Admin/AdminPublished.tsx";
import AdminArticles from "./pages/Admin/AdminArticles";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="issues" element={<Issues />} />
          <Route path="issues/:issueId" element={<IssueDetail />} />
          <Route path="editorial-board" element={<EditorialBoard />} />
          <Route path="for-authors" element={<ForAuthors />} />
          <Route path="contacts" element={<Contacts />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute roles={["USER"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-articles"
            element={
              <ProtectedRoute roles={["USER"]}>
                <MyArticles />
              </ProtectedRoute>
            }
          />
          <Route
            path="submit-article"
            element={
              <ProtectedRoute roles={["USER"]}>
                <SubmitArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute roles={["USER", "EDITOR", "SUPER_ADMIN"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="editor-dashboard"
            element={
              <ProtectedRoute roles={["EDITOR"]}>
                <EditorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="editor-articles"
            element={
              <ProtectedRoute roles={["EDITOR"]}>
                <EditorArticles />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-dashboard"
            element={
              <ProtectedRoute roles={["SUPER_ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="editors"
            element={
              <ProtectedRoute roles={["SUPER_ADMIN"]}>
                <AdminEditors />
              </ProtectedRoute>
            }
          />

          <Route
            path="users"
            element={
              <ProtectedRoute roles={["SUPER_ADMIN"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="issues-admin"
            element={
              <ProtectedRoute roles={["SUPER_ADMIN"]}>
                <AdminIssues />
              </ProtectedRoute>
            }
          />

          <Route
            path="publish"
            element={
              <ProtectedRoute roles={["SUPER_ADMIN"]}>
                <AdminPublish />
              </ProtectedRoute>
            }
          />

          <Route
            path="published"
            element={
              <ProtectedRoute roles={["SUPER_ADMIN"]}>
                <AdminPublished />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin-articles"
            element={
              <ProtectedRoute roles={["SUPER_ADMIN"]}>
                <AdminArticles />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
