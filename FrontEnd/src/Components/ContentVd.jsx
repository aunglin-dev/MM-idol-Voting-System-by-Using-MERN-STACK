import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  styled,
  Tooltip,
  Stack,
  IconButton,
} from "@mui/material";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../Utils/Constants";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import VdUploadModal from "./VdUploadModal";
import { deleteVideo } from "../Redux/ContestantsSlice";
import { useDispatch } from "react-redux";

const ContentVd = ({ video }) => {
  console.log(video);
  const dispatch = useDispatch();
  const currentTime = moment();

  const handleDeleteVideo = async () => {
    // Display confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (confirmed) {
      try {
        const res = await axios.delete(`/videos/${video._id}`);
        console.log(res.data._id);
        dispatch(deleteVideo(video._id));
        if (res.status === 200) {
          const resDetailVidoe = await axios.post(`/videos/saveVideoDetail`, {
            videoId: video._id,
            Transaction: "Delete",
          });
          resDetailVidoe.status === 200 &&
            window.alert("Video is successfully deleted");
        } else {
          window.alert("Failed to delete video");
        }
      } catch (error) {
        // If an error occurs during deletion, display error message
        window.alert("An error occurred while deleting the video");
      }
    }
  };

  return (
    <Card
      sx={{
        width: { xs: "450px", sm: "450px", md: "800px" },
        boxShadow: "2px",
        ml: { md: 15 },
        borderRadius: 0,
        marginBottom: "1px",
        height: "135px",
      }}
    >
      <Link to={video._id ? `/videos/${video._id}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          image={video?.imgUrl || demoThumbnailUrl}
          alt={video?.title}
          sx={{
            display: { sm: "block", md: "inline-block" },
            float: "left",
            width: { xs: "30%", sm: "30%", md: "30%" },
            height: "135px",
            border: "0.5px solid rgba(0,0,0,0.2)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Link>

      <CardContent
        sx={{
          backgroundColor: "#e6e6e6",
          height: "120px",
          width: { xs: "41%", sm: "41%", md: "51.82%" },
          display: "inline-block",
          float: "left",
        }}
      >
        <Link to={video._id ? `/videos/${video._id}` : demoVideoUrl}>
          <Typography variant="subtitle2" fontWeight="bold" color="#000">
            {video?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>

          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle3" fontWeight="100" color="#000">
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

          {/* Tags of Video */}
          <Stack pt={0.5} direction="row" alignItems="center">
            {video?.tags.map((val, i) => (
              <Typography
                variant="subtitle5"
                key={`${val}-${i}`}
                sx={{ mr: 2 }}
              >
                #{val}{" "}
              </Typography>
            ))}
          </Stack>
        </Link>
      </CardContent>

      <CardContent
        sx={{
          display: { xs: "inline-block", md: "inline-block" },
          float: { xs: "left", md: "left" },
          marginRight: "1px solid grey",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            marginTop: "19px",

            borderRight: "1px solid #000",
          }}
        >
          <VdUploadModal id={video._id} />
        </Stack>
      </CardContent>
      <CardContent>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "19px",
          }}
        >
          <Tooltip title="Delete This Video">
            <IconButton onClick={handleDeleteVideo}>
              <DeleteIcon sx={{ color: "#1557a5" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ContentVd;
