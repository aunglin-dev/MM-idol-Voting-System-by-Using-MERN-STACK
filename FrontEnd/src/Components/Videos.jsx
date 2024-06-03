import React from "react";
import { Stack, Box } from "@mui/material";
import Recommendations from "./Recommendations";
import { Loader, VideoCard, ChannelCard } from "./";

const Videos = ({ videos, direction }) => {
  console.log(videos);
  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={3}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {direction === "row"
            ? item._id && <VideoCard video={item} />
            : item._id && <Recommendations video={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
