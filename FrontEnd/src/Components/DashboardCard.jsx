import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import DashboardNewsCard from "./DashboardNewsCard";
import DashboardJudgesCard from "./DashboardJudgesCard";
import DashboardDeadlineCard from "./DashboardDeadlineCard";

const DashboardCard = () => {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={3}
    >
      <DashboardDeadlineCard />
      <DashboardNewsCard />
      <DashboardJudgesCard />
    </Stack>
  );
};

export default DashboardCard;
