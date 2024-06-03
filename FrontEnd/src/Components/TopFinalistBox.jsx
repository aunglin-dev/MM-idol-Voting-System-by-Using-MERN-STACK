import { Stack } from "@mui/material";
import React from "react";
import { Box, Typography } from "@mui/material";
import TopFinalistsCards from "./TopFinalistsCard";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const TopFinalistBox = ({ uniqueFinalists }) => {
  const { running } = useSelector((state) => state.deadline);
  if (!uniqueFinalists?.length) return <Loader />;
  console.log(uniqueFinalists);

  return (
    <Stack
      direction="column"
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
    >
      <Box>
        {running ? (
          <Typography variant="h5">
            The selection of top finalists is ongoing as the application
            deadline has not yet passed.
          </Typography>
        ) : (
          uniqueFinalists.map(
            (finalist, idx) =>
              finalist._id && (
                <TopFinalistsCards key={idx} finalists={finalist} />
              )
          )
        )}
      </Box>
    </Stack>
  );
};

export default TopFinalistBox;
