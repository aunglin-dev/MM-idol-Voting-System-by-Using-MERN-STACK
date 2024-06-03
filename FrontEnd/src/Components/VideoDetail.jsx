import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Typography,
  Box,
  Stack,
  Button,
  Tooltip,
  Badge,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import axios from "axios";
import { Videos, Loader } from "./";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuccess,
  like,
  dislike,
  AddExtraVoteToVideo,
  CalculateTotalVoteToVideo,
} from "../Redux/videoSlice";
import {
  subscription,
  UserLike,
  UserDislike,
  ExtraVote,
} from "../Redux/ContestantsSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Comments from "./Comments";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { current } from "@reduxjs/toolkit";

const currentTime = moment();

const VideoDetail = () => {
  const [videos, setVideos] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo, totalExtraVotes } = useSelector((state) => state.video);
  const { currentAdmin } = useSelector((state) => state.admin);

  const { running } = useSelector((state) => state.deadline);
  const [channel, setChannel] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const fetchData = async () => {
    const videoRes = await axios.get(`/videos/find/${id}`);
    const allVideo = await axios.get(`/videos/trend`);
    console.log(videoRes.data);
    const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
    const addView = await axios.put(`/videos/view/${id}`);
    setChannel(channelRes.data);
    setVideos(allVideo.data);
    console.log(channelRes.data);
    console.log(channel);
    dispatch(fetchSuccess(videoRes.data));
    currentUser && dispatch(CalculateTotalVoteToVideo(currentUser._id));
  };

  useEffect(() => {
    fetchData();
  }, [id, dispatch]);

  //Vote Button
  const handleVote = async () => {
    try {
      let newLikeStatus = !currentVideo.UsersLikes.includes(currentUser._id);
      let newVoteCount = newLikeStatus
        ? currentUser.Votedvideos.push(currentVideo._id)
        : currentUser.Votedvideos.pull(currentVideo._id);

      if (!newLikeStatus && newVoteCount >= 3) {
        window.alert(
          "You have already cast your three free votes for this season"
        );
        return;
      }

      // Optimistic UI updates
      if (newLikeStatus) {
        dispatch(like(currentUser._id));
        dispatch(UserLike(id));
      } else {
        dispatch(dislike(currentUser._id));
        dispatch(UserDislike(id));
      }
      const likeOrUnlikeRequest = axios.put(
        `/users/${newLikeStatus ? "like" : "unlike"}/${id}`
      );
      const voteDetailRequest = axios.post(`/VoteDetail`, {
        userId: currentUser._id,
        videoId: id,
        Transaction: newLikeStatus ? undefined : "unVote",
      });

      await Promise.all([likeOrUnlikeRequest, voteDetailRequest]);
    } catch (error) {
      console.error("Error occurred while submitting vote:", error);

      // Handle error (e.g., show error message to user)
    }
  };

  //Handle Extra Vote
  const handleExtraVote = async () => {
    if (currentUser?.extraVotes === 0) {
      window.alert("Please Purchase Extra Vote First");
    } else {
      const confirmed = window.confirm(
        "Are you sure you want to cast an external vote on this video"
      );
      if (confirmed) {
        try {
          console.log(id);
          const ExtraVoteRes = await axios.put(`/users/Extralike/${id}`);
          console.log(ExtraVoteRes.status);
          await axios.post(`/VoteDetail`, {
            userId: currentUser._id,
            videoId: id,
            VoteType: "ExtraVote",
          });
          dispatch(ExtraVote(id));
          dispatch(AddExtraVoteToVideo(currentUser._id));

          console.log("ExtraVote submitted successfully");
        } catch (error) {
          console.error("Error occurred while submitting vote:", error);
        }
      }
    }
  };

  //Follow Button
  const handleFollow = async () => {
    if (!currentUser) {
      const confirmed = window.confirm(
        "You Need To Login First Before You Follow Contestants"
      );
      confirmed && navigate("/signin/Users");
    } else {
      currentUser.subscribedUsers.includes(channel._id)
        ? await axios.put(`/users/unsub/${channel._id}`)
        : await axios.put(`/users/sub/${channel._id}`);
      dispatch(subscription(channel._id));
    }
  };

  //Handle Guest User
  const handleGuestUser = () => {
    const confirmed = window.confirm(
      "You Need To Login First Before You Vote Videos"
    );
    confirmed && navigate("/signin/Users");
  };

  if (!currentVideo) return <Loader />;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              width: "100%",
              top: "86px",
              position: "sticky",
              backgroundColor: "#fff",
            }}
          >
            <ReactPlayer
              url={currentVideo.videoUrl}
              className="react-player"
              controls
            />
            <Box p={3}>
              <Stack direction="row" alignItems="center">
                <Typography color="#000" variant="h4" fontWeight="bold" p={2}>
                  {currentVideo.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7, marginLeft: "5px" }}
                >
                  {currentAdmin && <>{currentVideo?.likes} likes</>}
                </Typography>
              </Stack>

              {/*Start  ChannelName , Follow , View ,Vote */}
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  color: "#000",

                  borderRadius: "15px",
                }}
                py={1}
                p={2}
                px={2}
              >
                <Stack
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  sx={{ marginRight: "auto" }}
                >
                  <Link to={`/channel/${channel._id}`}>
                    <Avatar
                      alt="Remy Sharp"
                      sx={{
                        display: "inline-block",
                        float: "left",
                        mr: { xs: 1, md: 2 },
                        width: "50px",
                        height: "50px",
                      }}
                      src={channel?.img}
                    />

                    <Typography
                      sx={{
                        variant: { sm: "h4", md: "h1" },
                        display: "flex",
                      }}
                      color="#000"
                    >
                      {channel.name}

                      <CheckCircleIcon
                        sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                      />
                    </Typography>
                  </Link>
                  {!currentAdmin && (
                    <Button
                      disabled={
                        Object.keys(channel).length === 0 ? true : false
                      }
                      sx={{
                        border: "1px solid #1976d2",
                        marginLeft: "40px",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#1557a5", // Change background color on hover
                          color: "#fff", // Change text color on hover
                        },
                      }}
                      onClick={handleFollow}
                    >
                      {currentUser
                        ? currentUser.subscribedUsers.includes(
                            currentVideo.userId
                          )
                          ? "Followed"
                          : "Follow"
                        : "Follow"}
                      {}
                    </Button>
                  )}
                </Stack>

                {!currentAdmin && (
                  <>
                    {currentUser ? (
                      <Stack direction="row" gap="20px" alignItems="center">
                        {currentVideo.UsersLikes.includes(currentUser._id) ? (
                          <Tooltip title="UnVote This Video">
                            <IconButton
                              disabled={!running}
                              onClick={handleVote}
                            >
                              <FavoriteIcon sx={{ color: "#1557a5" }} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title=" Vote This Video">
                            <IconButton
                              disabled={!running}
                              onClick={handleVote}
                            >
                              <FavoriteBorderOutlinedIcon
                                sx={{ color: running ? "#1557a5" : "#d3d3d3" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}

                        <span>|</span>

                        {currentUser?.Role !== "Judge" && (
                          <Tooltip title="ExtraVote This Video">
                            <Badge
                              color="primary"
                              badgeContent={totalExtraVotes}
                            >
                              <IconButton
                                disabled={!running}
                                onClick={handleExtraVote}
                              >
                                <AddCircleOutlineOutlinedIcon
                                  sx={{
                                    fontSize: "20px",
                                    color: running ? "#1557a5" : "#d3d3d3",
                                  }}
                                />
                              </IconButton>
                            </Badge>
                          </Tooltip>
                        )}
                      </Stack>
                    ) : (
                      <Tooltip title="Vote This Video">
                        <IconButton
                          disabled={!running}
                          onClick={handleGuestUser}
                          sx={{
                            Color: "grey",
                          }}
                        >
                          <FavoriteBorderOutlinedIcon
                            sx={{ color: running ? "#1557a5" : "grey" }}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
              </Stack>
              {/*End  ChannelName , Follow , View ,Vote */}

              {/* Start Description */}
              <Stack
                direction="column"
                justifyContent="space-between"
                p={2}
                sx={{
                  color: "#000",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "15px",
                }}
              >
                <Stack direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    sx={{ opacity: 0.7, color: "#000" }}
                  >
                    {parseInt(currentVideo.views).toLocaleString()} views •
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ opacity: 0.7, marginLeft: "8px" }}
                  >
                    {moment
                      .duration(
                        currentTime.diff(
                          moment(currentVideo.createdAt).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        )
                      )
                      .humanize()}{" "}
                    ago
                  </Typography>
                </Stack>

                <Stack pt={3}>
                  <Typography variant="body1"> {currentVideo.desc}</Typography>
                </Stack>
                <Stack pt={2} direction="row" alignItems="center">
                  {currentVideo?.tags.map((val, i) => (
                    <Typography
                      variant="subtitle5"
                      key={val + i}
                      sx={{ mr: 2 }}
                    >
                      #{val}{" "}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
              {/* End Description */}

              {/* Start Comment  */}
              <Stack pt={5}>
                <Comments videoId={currentVideo._id} />
              </Stack>
              {/* End Comment  */}
            </Box>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
