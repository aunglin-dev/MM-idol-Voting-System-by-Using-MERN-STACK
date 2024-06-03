import React from "react";
import { Stack, Box } from "@mui/material";
import JudgesCard from "./JudgesCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { Fragment } from "react";

const JudgesFeed = () => {
  const [judges, setjudges] = useState([]);
  const fetchNews = async () => {
    const res = await axios.get(`/judges/total`);
    setjudges(res.data);
  };

  useEffect(() => {
    fetchNews();
    console.log(judges);
  }, []);
  return (
    <Stack
      mt={5}
      direction="row"
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      gap={3}
    >
      {judges.map((item, idx) => (
        <Fragment key={idx}>
          {item._id && <JudgesCard judges={item} />}
        </Fragment>
      ))}
    </Stack>
  );
};

export default JudgesFeed;
