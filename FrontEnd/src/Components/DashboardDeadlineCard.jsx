import React from "react";
import ManageNews2 from "./ManageJugdes";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Box,
} from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import { addFinalTime, addEndTime, TimeSuccess } from "../Redux/Deadline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const DashboardDeadlineCard = () => {
  const { FinalTime, tempEndTime, running } = useSelector(
    (state) => state.deadline
  );
  const dispatch = useDispatch();
  let timer;

  console.log(FinalTime);
  const calculateTimeDifference = () => {
    const currentDate = new Date();
    const endTime = new Date(tempEndTime);
    const difference = endTime.getTime() - currentDate.getTime();
    console.log(difference);
    return difference > 0 ? difference : 0;
  };

  const CheckDate = calculateTimeDifference() > 0 ? false : true;

  useEffect(() => {
    if (running) {
      timer = setInterval(() => {
        dispatch(addFinalTime(calculateTimeDifference()));
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running, tempEndTime]);

  const handleStartStop = () => {
    dispatch(TimeSuccess(!running));
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear this deadline?"
    );
    if (confirmed) {
      dispatch(addFinalTime(0));
      dispatch(TimeSuccess(false));
    }
  };

  const formattedTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return `${days} days: ${hours} hours: ${minutes} minutes: ${seconds} seconds`;
  };

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
          Set Deadline <TimerIcon sx={{ ml: 0.5, color: "#1557a5" }} />
        </Typography>
        <Stack style={{ marginBottom: "10px" }}>
          {formattedTime(FinalTime)}
        </Stack>
        <TextField
          margin="normal"
          type="date"
          required
          fullWidth
          id="dob"
          label=" Set The Deadline For Myanmar Idol Season 4"
          name="dob"
          autoComplete="dob"
          autoFocus
          value={tempEndTime}
          onChange={(e) => dispatch(addEndTime(e.target.value))}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="outlined"
          disabled={CheckDate}
          onClick={handleStartStop}
          sx={{ fontSize: "12px" }}
        >
          {running ? "Stop Timer" : "Start Timer"}
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 1, backgroundColor: "#1557a5", fontSize: "12px" }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardDeadlineCard;
