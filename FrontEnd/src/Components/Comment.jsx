import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const currentTime = moment();

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  console.log("comment", comment);
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        `/${comment.CommentBy === "Judge" ? "judges" : "users"}/find/${
          comment.userId
        }`
      );
      setChannel(res.data);
      console.log("Judge or User", res.data);
      console.log("User or Judge", channel);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar
        src={channel?.img || channel?.imgUrl}
        sx={{
          border: "1px solid grey",
          width: "150px",
          height: "50px",
        }}
      />
      <Details>
        <Name>
          {channel.name} [{channel?.Role}] •
          <Date>
            {" "}
            {moment
              .duration(
                currentTime.diff(
                  moment(comment.createdAt).format("YYYY-MM-DD HH:mm:ss")
                )
              )
              .humanize()}{" "}
            ago
          </Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
