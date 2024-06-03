import React from "react";
import { Badge, Button, Box, Tooltip } from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import Payment from "../Actions/Payment";

const Notification = () => {
  return (
    <Box sx={{ ml: { sx: 2 } }}>
      <Payment />
    </Box>
  );
};

export default Notification;
