import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  styled,
  Stack,
} from "@mui/material";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../Utils/Constants";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

const Recommendations = ({ video }) => {
  console.log(video);
  const [user, setuser] = useState({});

  const currentTime = moment();

  const fetchUser = async () => {
    const UserData = await axios.get(`/users/find/${video.userId}`);
    setuser(UserData.data);
  };

  useEffect(() => {
    fetchUser();
  }, [video]);

  return (
    <Card
      sx={{
        width: { xs: "465px", sm: "465px", md: "800px" },
        boxShadow: "2px",
        ml: { md: 15 },
        borderRadius: 0,

        marginBottom: "1px",
      }}
    >
      <Link to={video._id ? `/videos/${video._id}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          image={video?.imgUrl || demoThumbnailUrl}
          alt={video?.title}
          sx={{
            display: { sm: "block", md: "inline-block" },
            float: "left",
            width: { xs: "40%", sm: "50%", md: "30%" },
            height: 140,
            border: "0.5px solid rgba(0,0,0,0.2)",
          }}
        />
      </Link>

      <CardContent
        sx={{
          backgroundColor: "#e6e6e6",
          height: "100px",
          width: { sm: "100%", md: "65.82%" },
          display: { sm: "block", md: "inline-block" },
          float: { sm: "none", md: "right" },
        }}
      >
        <Link to={video._id ? `/videos/${video._id}` : demoVideoUrl}>
          <Typography variant="subtitle2" fontWeight="bold" color="#000">
            {video?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>

          <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
            <Typography
              variant="subtitle3"
              fontWeight="100"
              pt={0}
              color="#000"
            >
              {video.views} views •
            </Typography>
            <Typography
              variant="subtitle3"
              sx={{ opacity: 0.7, marginLeft: "8px" }}
            >
              {moment
                .duration(
                  currentTime.diff(
                    moment(video?.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  )
                )
                .humanize()}{" "}
              ago
            </Typography>
          </Stack>

          <Stack pt={1}>
            <Typography variant="body1"> {video?.desc}</Typography>
          </Stack>
          <Stack pt={2} direction="row" alignItems="center">
            {video?.tags.map((val, i) => (
              <Typography
                variant="subtitle5"
                key={`${val}-${i}`}
                sx={{ ml: 2 }}
              >
                #{val}{" "}
              </Typography>
            ))}
          </Stack>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
