import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  styled,
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

const currentTime = moment();

const VideoCard = ({ video }) => {
  console.log(video);
  const [user, setuser] = useState({});

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
        width: { xs: "450px", sm: "450px", md: "335px" },
        boxShadow: "2px",
        borderRadius: 0,
        marginBottom: "8px",
      }}
    >
      <Link to={video._id ? `/videos/${video._id}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          image={video?.imgUrl || demoThumbnailUrl}
          alt={video?.title}
          sx={{
            width: { xs: "100%", sm: "358px" },
            height: 140,
            borderBottom: "0.5px solid rgba(0,0,0,0.2)",
          }}
        />
      </Link>

      <CardContent sx={{ backgroundColor: "#e6e6e6", height: "60px" }}>
        <Link to={video._id ? `/videos/${video._id}` : demoVideoUrl}>
          <Typography variant="subtitle2" fontWeight="bold" color="#000">
            {video?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>

          <Typography variant="subtitle3" fontWeight="100" pt={0} color="#000">
            {video.views} views •{" "}
            {moment
              .duration(
                currentTime.diff(
                  moment(video?.createdAt).format("YYYY-MM-DD HH:mm:ss")
                )
              )
              .humanize()}{" "}
            ago
          </Typography>
        </Link>
        <Link to={video?.userId ? `/channel/${video.userId}` : demoChannelUrl}>
          <Typography variant="subtitle2" pt={1} color="#000">
            {user.name || demoChannelTitle}
            <CheckCircleIcon
              sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
            />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
