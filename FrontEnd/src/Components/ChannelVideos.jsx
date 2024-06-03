import React from "react";
import { Stack, Box } from "@mui/material";
import Recommendations from "./Recommendations";
import { Loader, VideoCard, ChannelCard } from "./";
import ChannelRecommedations from "./ChannelRecommedations";

const Videos = ({ videos }) => {
  console.log(videos);
  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={3}
      marginTop="5px"
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item._id && <ChannelRecommedations video={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
