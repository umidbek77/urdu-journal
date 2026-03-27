import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Sidebar from "./components/layout/Sidebar";
import { Box } from "@mui/material";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {user && <Sidebar />}

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
