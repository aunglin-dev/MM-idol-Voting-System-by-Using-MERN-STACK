import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import axios from "axios";
import ChannelVideos from "./ChannelVideos";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  const fetchResults = async () => {
    const channelRes = await axios.get(`/users/find/${id}`);
    setChannelDetail(channelRes.data);
    const videosData = await axios.get(`/videos/getVideo/${id}`);
    setVideos(videosData.data);
    console.log(videosData.data);
  };

  useEffect(() => {
    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            height: "300px",
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        <ChannelVideos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
