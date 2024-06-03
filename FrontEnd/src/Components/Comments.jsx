import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import { Form, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import myImage from "../Image/Logo_of_Myanmar_Idol-removebg-preview.png";
import { demoProfilePicture } from "../Utils/Constants";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentAdmin } = useSelector((state) => state.admin);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId, comments]);

  console.log(comments);
  console.log(comment);

  //Add Comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      const confirmed = window.confirm(
        "You Need To Login First Before You Comment On Video"
      );
      confirmed && navigate("/signin/Users");
    } else {
      setComment("");
      // const data = new FormData(e.currentTarget);
      const commentRes = await axios.post(`/comments/`, {
        userId: currentUser._id,
        videoId: videoId,
        desc: comment,
        CommentBy: currentUser.Role,
      });
      commentRes.status = 200;
      commentRes.status === 200 && window.alert("Your Comment Have Been Added");
    }
  };

  return (
    <Container>
      <Typography variant="h6" fontWeight="600">
        {comments.length > 0 ? comments.length : 0} Comments
      </Typography>
      {!currentAdmin && (
        <NewComment>
          <Avatar
            src={currentUser?.img || currentUser?.imgUrl || demoProfilePicture}
            alt="Remy Sharp"
            sx={{
              border: "1px solid grey",
              width: "50px",
              height: "50px",
            }}
          />

          <Box
            display="flex"
            flexDirection="row"
            component="form"
            alignItems="center"
            noValidate
            onSubmit={handleComment}
            sx={{ width: "80%", pt: "20px" }}
          >
            <Input
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                display: comment ? "visible" : "none",
                fontSize: "15",

                ml: 2,
                mb: 2,
                borderRadius: "50px",
                padding: "7px 20px",
              }}
            >
              Comment
            </Button>
          </Box>
        </NewComment>
      )}
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
