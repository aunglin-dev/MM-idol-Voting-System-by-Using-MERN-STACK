import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import DashboardCard from "./DashboardCard";

const DashboardControl = () => {
  return (
    <Box sx={{ pb: 3, borderBottom: "1px solid grey" }}>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Dashboard Control
      </Typography>
      <DashboardCard />
    </Box>
  );
};

export default DashboardControl;
