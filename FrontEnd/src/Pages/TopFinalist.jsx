import React, { useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";

import { useState } from "react";
import axios from "axios";
import SideBar from "../Components/SideBar";
import { addFinalTime } from "../Redux/Deadline";
import { useDispatch, useSelector } from "react-redux";
import TopFinalistBox from "../Components/TopFinalistBox";

const TopFinalists = () => {
  const [selectedCategory, setSelectedCategory] = useState("TopFinalists");
  const [finalists, setFinalists] = useState([]);
  const [uniqueFinalists, setUniqueFinalists] = useState([]);
  const [totalFinalists, setTotalFinalists] = useState([]);

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

  const countIdenticalValues = (arr) => {
    const counts = {};
    let totalCount = 0;

    arr.forEach((item) => {
      counts[item.userId] = (counts[item.userId] || 0) + 1;
    });

    Object.values(counts).forEach((count) => {
      totalCount += count >= 2 ? count : 0;
    });

    return totalCount;
  };

  const fetchTopFinalists = async () => {
    const FinalistsData = await axios.get("/videos/findMostLikedVideo");
    setFinalists(FinalistsData.data);
    const uniqueFinalists = finalists.slice(0, 9);
    setUniqueFinalists(uniqueFinalists);
  };

  useEffect(() => {
    fetchTopFinalists();
    console.log("Top Finalists:", finalists);

    const totalIdenticalOccurrences = countIdenticalValues(uniqueFinalists);

    const sliceNumber = totalIdenticalOccurrences + 10;
    const totalFinalists = finalists.slice(0, sliceNumber);
    setTotalFinalists(totalFinalists);
    console.log("Unique Finalists:", uniqueFinalists);
    console.log("Unique Number", totalIdenticalOccurrences);
  }, [setSelectedCategory, finalists]);

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
            {selectedCategory}{" "}
            <span style={{ color: "#1557a5" }}>of this season</span>
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ color: "#000", marginBottom: "35px" }}
          >
            Remaining Time :{" "}
            <span style={{ color: "#1557a5" }}>{formattedTime(FinalTime)}</span>
          </Typography>
          <TopFinalistBox uniqueFinalists={totalFinalists} />
        </Box>
      </Stack>
    </div>
  );
};

export default TopFinalists;
