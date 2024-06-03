import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import SideBar from "../Components/SideBar";
import { useState } from "react";
import DashboardDesign from "../Components/DashboardDesign";
import DashboardControl from "../Components/DashboardControl";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Dashboard");
  const { currentAdmin } = useSelector((state) => state.admin);

  if (!currentAdmin) {
    return <Typography>You have no access to this page</Typography>;
  }

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <SideBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Box p={3} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#000", marginBottom: "10px" }}
        >
          Admin <span style={{ color: "#1557a5" }}>{selectedCategory}</span>
        </Typography>
        <DashboardDesign />
        <DashboardControl />
        {/* <ManageNews /> */}
        {/* <ManageNews2 /> */}
        {/* <ManageJugdes /> */}

        {/* <DashboardCard /> */}
      </Box>
    </Stack>
  );
};

export default Dashboard;
