import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography, Tooltip, Badge } from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AddExtraVote } from "../Redux/ContestantsSlice";

const Wrapper = styled.div`
  width: 390px;
  height: 230px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: left;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

export default function Payment() {
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState({});
  const [extraVoteNumber, setExtraVoteNumber] = useState(1);
  const [totalPrice, setTotalPrice] = useState(5);
  const { currentUser } = useSelector((state) => state.user);
  const { running } = useSelector((state) => state.deadline);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TemphandleChange = (event) => {
    const value = event.target.value;
    setExtraVoteNumber(value);
    setTotalPrice(value * 5);
  };
  console.log();
  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/users/Payment", {
      TotalQuantity: extraVoteNumber,
      TotalPrice: totalPrice,
    });
    try {
      if (res.status === 200) {
        window.alert(`Succesfully Purchased ${extraVoteNumber} Extra Votes`);
        navigate(`/`);
        dispatch(AddExtraVote(extraVoteNumber));
        setOpen(false);
      }
    } catch (err) {
      console.log(res.body.data);
      console.log(err.message);
    }
  };

  const top100Films = [
    { label: "1 Extra Vote", value: 1 },
    { label: "2 Extra Votes", value: 2 },
    { label: "3 Extra Votes", value: 3 },
    { label: "4 Extra Votes", value: 4 },
    { label: "5 Extra Votes", value: 5 },
    { label: "6 Extra Vote", value: 6 },
    { label: "7 Extra Votes", value: 7 },
    { label: "8 Extra Votes", value: 8 },
    { label: "9 Extra Votes", value: 9 },
    { label: "10 Extra Votes", value: 10 },
  ];

  return (
    <Box sx={{ ml: { md: 1, sx: 0, sm: 0 } }}>
      <Button onClick={handleClickOpen} disabled={!running}>
        <Tooltip title="Purchase Extra Vote">
          <Badge color="secondary" badgeContent={currentUser?.extraVotes}>
            <HowToVoteIcon sx={{ color: running ? "#1557a5" : "#d3d3d3" }} />
          </Badge>
        </Tooltip>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Close onClick={() => setOpen(false)}>X</Close>
          <Title>
            {" "}
            Purchase Extra Vote <HowToVoteIcon sx={{ fontSize: 36 }} />
          </Title>
          <Typography variant="subtitle1">
            {" "}
            Current Extra Vote : {currentUser.extraVotes}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <Wrapper>
                <Box>
                  <label
                    htmlFor="unitPrice"
                    style={{
                      width: 150,
                      display: "inline-block",
                      float: "left",
                      fontSize: "15px",
                    }}
                  >
                    Unit Extra Price :
                  </label>
                  <input
                    type="text"
                    value="5 $"
                    disabled={true}
                    name="unitPrice"
                    style={{
                      width: "55%",
                      padding: 5,
                      textAlign: "center",
                    }}
                  />
                </Box>
                <Box>
                  <InputLabel
                    sx={{
                      display: "inline-block",
                      float: "left",
                      mt: 2,
                    }}
                    id="number-of-extra-vote-label"
                  >
                    Total Extra Vote:
                  </InputLabel>
                  <Select
                    labelId="number-of-extra-vote-label"
                    id="extraVote"
                    sx={{ ml: 3.5, width: { md: "60%", xs: "59%" } }}
                    value={extraVoteNumber}
                    onChange={TemphandleChange}
                  >
                    {top100Films.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box>
                  <label
                    htmlFor="unitPrice"
                    style={{
                      width: 150,
                      display: "inline-block",
                      float: "left",
                      fontSize: "15px",
                    }}
                  >
                    Total Price :
                  </label>
                  <input
                    type="text"
                    disabled={true}
                    value={`${totalPrice} $`}
                    name="TotalPrice"
                    style={{ width: "55%", padding: 5, textAlign: "center" }}
                  />
                </Box>

                <Button
                  sx={{
                    border: "1px solid #1557a5",
                    mt: 2,
                    width: { md: "93%", xs: "93%" },
                    "&:hover": {
                      backgroundColor: "#1557a5", // Change background color on hover
                      color: "#fff", // Change text color on hover
                    },
                  }}
                  onClick={handleUpload}
                >
                  Purchase Extra Votes
                </Button>
              </Wrapper>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
