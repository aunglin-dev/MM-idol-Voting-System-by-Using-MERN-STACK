import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import SideBar from "../Components/SideBar";
import { useState } from "react";
import DashboardDesign from "../Components/DashboardDesign";
import DashboardControl from "../Components/DashboardControl";
import ManageNews from "../Components/ManageNews";
import ChannelRecommendations from "../Components/ChannelRecommedations";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { Loader } from "../Components";
import { fetchVideos } from "../Redux/ContestantsSlice";

import ContentRenderVd from "../Components/ContentRenderVd";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Dashboard");
  const [videos, setVideos] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const fetchResults = async () => {
    const videosData = await axios.get(`/users/find/${currentUser._id}`);
    console.log(videosData.data.Uploadedvideos);
    setVideos(videosData.data.Uploadedvideos);
    // disptach(fetchVideos(videosData.data));
  };

  useEffect(() => {
    currentUser && fetchResults();
  }, [videos]);

  if (!currentUser) {
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
          Content <span style={{ color: "#1557a5" }}>Management</span>
        </Typography>
        <DashboardDesign />
        <ContentRenderVd Uservideos={videos} />
      </Box>
    </Stack>
  );
};

export default Dashboard;
