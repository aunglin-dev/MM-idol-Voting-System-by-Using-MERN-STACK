import React, { Fragment, useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import NewsCard from "../Components/NewsCard";
import axios from "axios";

const NewsFeed = () => {
  const [news, setnews] = useState([]);
  const fetchNews = async () => {
    const res = await axios.get(`/news/lastest`);
    setnews(res.data);
  };

  useEffect(() => {
    fetchNews();
    console.log(news);
  }, [news]);
  return (
    <Stack
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={5}
      sx={{ mt: 5 }}
    >
      {news.map((item, idx) => (
        <Fragment key={idx}>{item._id && <NewsCard news={item} />}</Fragment>
      ))}
    </Stack>
  );
};

export default NewsFeed;
