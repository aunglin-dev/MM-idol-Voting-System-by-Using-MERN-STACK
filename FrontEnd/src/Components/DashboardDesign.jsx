import React from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../Utils/Constants";
import { useSelector } from "react-redux";

const DashboardControl = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentAdmin } = useSelector((state) => state.admin);

  return (
    <Box
      sx={{
        boxShadow: "none",

        display: "column",

        justifyContent: "right",
        alignItems: "left",

        height: "200px",
        margin: "auto",
        borderBottom: "1px solid grey",
      }}
    >
      <CardContent
        sx={{
          display: "column",

          textAlign: "left",

          color: "#fff",
        }}
      >
        <CardMedia
          image={currentUser?.img || demoProfilePicture}
          sx={{
            borderRadius: "50%",
            height: "140px",
            width: "140px",
            mb: 2,
            mt: 2,
            float: "left",
            border: "1px solid #e3e3e3",
          }}
        />
        <Typography
          variant="h4"
          sx={{ display: "inline-block", mt: 6, ml: 4, color: "#000" }}
        >
          {currentUser?.name || currentAdmin?.name}
          <CheckCircleIcon
            sx={{ fontSize: "14px", color: "gray", ml: "5px" }}
          />
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 500,
            color: "gray",
            ml: 22,
            mt: 1,
          }}
        >
          {currentUser?.Role === "Contestant" && (
            <>{currentUser?.subscribers} Subscribers</>
          )}
        </Typography>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 500,
            color: "gray",
            ml: 22,
            mt: 1,
          }}
        >
          {currentUser?.email || currentAdmin?.email}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default DashboardControl;
