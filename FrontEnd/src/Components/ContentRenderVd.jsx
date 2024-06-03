import React, { useEffect, useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import Recommendations from "./Recommendations";
import { Loader, VideoCard, ChannelCard } from "./";
import ContentVd from "./ContentVd";

const ContentRenderVd = ({ Uservideos }) => {
  const [videos, setVideos] = useState(null);
  // console.log(Uservideos);

  useEffect(() => {
    setVideos(Uservideos);
  }, [Uservideos]);
  console.log(videos);

  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={3}
      marginTop="15px"
    >
      <Typography variant="h4"> Manage Content </Typography>
      {videos.map((item, idx) => (
        <Box key={idx}>{item._id && <ContentVd video={item} />}</Box>
      ))}
    </Stack>
  );
};

export default ContentRenderVd;
