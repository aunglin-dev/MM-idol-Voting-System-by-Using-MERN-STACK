import React, { useState } from "react";
import { Stack, Card, CardContent, CardMedia, Typography } from "@mui/material";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../Utils/Constants";
import { useEffect } from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const TopFinalistsCard = ({ finalists }) => {
  const [users, setUser] = useState({});

  const fetchUser = async () => {
    const UserData = await axios.get(`/users/find/${finalists.userId}`);
    setUser(UserData.data);
  };

  useEffect(() => {
    fetchUser();
  }, [finalists]);

  return (
    <Card
      sx={{
        width: { xs: "450px", sm: "450px", md: "850px" },
        boxShadow: "2px",
        ml: { md: 15 },
        borderRadius: 0,
        marginBottom: "20px",
        height: "110px",
      }}
    >
      <CardMedia
        image={users.img || demoThumbnailUrl}
        alt="Ok"
        sx={{
          display: { sm: "block", md: "inline-block" },
          float: "left",
          width: { xs: "30%", sm: "30%", md: "15%" },
          height: "120px",
          border: "0.5px solid rgba(0,0,0,0.2)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <CardContent
        sx={{
          backgroundColor: "#e6e6e6",
          height: "120px",
          width: { xs: "62%", sm: "62%", md: "80.9%" },
          display: "inline-block",
          float: "left",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" color="#000">
          {users.name || demoVideoTitle.slice(0, 60)}
        </Typography>
        <Stack>
          <Typography variant="subtitle1"> {finalists?.title}</Typography>
        </Stack>

        <Stack>
          <Typography pt={1} variant="subtitle2">
            {" "}
            {finalists?.likes} votes • {finalists?.views} views
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TopFinalistsCard;
