import React, { useEffect, useState } from "react";
import ManageNews2 from "./ManageNews2";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import axios from "axios";

const DashboardNewsCard = () => {
  const [news, setnews] = useState([]);
  const fetchNews = async () => {
    const res = await axios.get(`/news/lastest`);
    setnews(res.data);
  };
  useEffect(() => {
    fetchNews();
  }, [news]);
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
          Add News <FeedIcon sx={{ ml: 0.5, color: "#1557a5" }} />
        </Typography>

        <Stack textAlign="center" mt={4} color="#000">
          <ManageNews2 />
          <Typography variant="body" mt={3}>
            Current Total News: {news?.length}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardNewsCard;
