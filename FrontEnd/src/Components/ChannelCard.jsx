import React from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../Utils/Constants";

const ChannelCard = ({ channelDetail, marginTop }) => (
  <Box
    sx={{
      boxShadow: "none",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: { xs: "356px", md: "320px" },
      height: "326px",
      margin: "auto",
      marginTop,
    }}
  >
    <Link to={`/channel/${channelDetail?.id?.channelId}`}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <CardMedia
          image={channelDetail?.img || demoProfilePicture}
          alt={channelDetail?.snippet?.title}
          sx={{
            borderRadius: "50%",
            height: "180px",
            width: "180px",
            mb: 2,
            border: "1px solid #e3e3e3",
          }}
        />
        <Typography variant="h6" sx={{ color: "#000" }}>
          {channelDetail?.name}{" "}
          <CheckCircleIcon
            sx={{ fontSize: "14px", color: "gray", ml: "5px" }}
          />
        </Typography>

        <Typography sx={{ fontSize: "15px", fontWeight: 500, color: "#000" }}>
          Subscribers:{" "}
          {parseInt(channelDetail?.subscribedUsers.length).toLocaleString(
            "en-US"
          )}{" "}
        </Typography>
      </CardContent>
    </Link>
  </Box>
);

export default ChannelCard;
