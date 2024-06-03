import React, { useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import Videos from "../Components/Videos";
import { useState } from "react";
import axios from "axios";
import SideBar from "../Components/SideBar";
import { addFinalTime } from "../Redux/Deadline";
import { useDispatch, useSelector } from "react-redux";

const Favourite = () => {
  const [selectedCategory, setSelectedCategory] = useState("Favourite");
  const [videos, setVideos] = useState(null);
  const { FinalTime, tempEndTime, running } = useSelector(
    (state) => state.deadline
  );
  const dispatch = useDispatch();
  let timer;

  const calculateTimeDifference = () => {
    const currentDate = new Date();
    const endTime = new Date(tempEndTime);
    const difference = endTime.getTime() - currentDate.getTime();
    console.log(difference);
    return difference > 0 ? difference : 0;
  };

  useEffect(() => {
    if (running) {
      timer = setInterval(() => {
        dispatch(addFinalTime(calculateTimeDifference()));
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running, tempEndTime]);

  const formattedTime = (milliseconds) => {
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return `${days} days: ${hours} hours: ${minutes} minutes`;
  };

  const FetchVideos = async () => {
    const response = await axios.get("/videos/sub");
    setVideos(response.data);
  };

  useEffect(() => {
    FetchVideos();
    console.log(videos);
  }, [setSelectedCategory]);

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
            sx={{ color: "#000", marginBottom: "5px" }}
          >
            {selectedCategory} <span style={{ color: "#1557a5" }}>Videos </span>
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ color: "#000", marginBottom: "35px" }}
          >
            Remaining Time :{" "}
            <span style={{ color: "#1557a5" }}>{formattedTime(FinalTime)}</span>
          </Typography>
          {videos?.length == 0 ? (
            <Typography variant="h4">
              You still didn't Follow Any Contestants
            </Typography>
          ) : (
            <Videos videos={videos} direction="row" />
          )}
        </Box>
      </Stack>
    </div>
  );
};

export default Favourite;
