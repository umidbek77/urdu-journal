import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Sidebar from "./components/layout/Sidebar";
import { Box } from "@mui/material";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const protectedLayouts = [
    "/dashboard",
    "/my-articles",
    "/submit-article",
    "/profile",
    "/editor-dashboard",
    "/editor-articles",
    "/admin-dashboard",
    "/editors",
    "/users",
    "/issues-admin",
    "/publish",
    "/published",
    "/admin-articles",
  ];

  const showSidebar =
    user && protectedLayouts.some((path) =>
      location.pathname.startsWith(path)
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {showSidebar && <Sidebar />}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: "#f5f6fa",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default App;