import React, { useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { useState } from "react";
import SideBar from "../Components/SideBar";
import JudgesFeed from "../Components/JudgesFeed";
import NewsFeed from "../Components/NewsFeed";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Judges");

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
            Myanmar Idol's{" "}
            <span style={{ color: "#1557a5" }}>{selectedCategory}</span>
            <JudgesFeed />
          </Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default Feed;
