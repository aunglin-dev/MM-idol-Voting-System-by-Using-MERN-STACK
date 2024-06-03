import React from "react";

import ManageJugdes from "./ManageJugdes";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";

const DashboardJudgesCard = () => {
  return (
    <Card
      sx={{
        width: { xs: "450px", sm: "450px", md: "335px" },
        boxShadow: "2px",
        borderRadius: 0,
        marginBottom: "8px",
      }}
    >
      <CardContent sx={{ backgroundColor: "#fff", height: "160px" }}>
        <Typography
          variant="h6"
          textAlign="center"
          fontWeight="bold"
          color="#000"
        >
          Add Judges <BalanceIcon sx={{ ml: 0.5, color: "#1557a5" }} />
        </Typography>

        <Stack textAlign="center" mt={4} color="#000">
          <ManageJugdes />
          <Typography variant="body" mt={3}>
            Current Total Judges: 3
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardJudgesCard;
