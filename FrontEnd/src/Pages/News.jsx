import React, { useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";

import { useState } from "react";
import axios from "axios";
import SignInSide from "../Actions/SigInSide";
import SideBar from "../Components/SideBar";

import NewsFeed from "../Components/NewsFeed";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("News");

  return (
    <div>
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Box p={3} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#000", marginBottom: "35px" }}
          >
            Latest <span style={{ color: "#1557a5" }}>{selectedCategory}</span>
            <NewsFeed />
          </Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default Feed;
