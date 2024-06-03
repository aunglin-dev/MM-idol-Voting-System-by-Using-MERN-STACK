import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FeedIcon from "@mui/icons-material/Feed";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import app from "../firebase";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 400px;
  height: 500px;
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
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Label = styled.label`
  font-size: 14px;
`;

export default function ManageJugdes() {
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phNumber, setPhoneNumber] = useState("");
  const [History, setHistory] = useState("");
  const [ImgFile, setImgFile] = useState("");
  const [Password, setPassword] = useState("");
  const { currentAdmin } = useSelector((state) => state.admin);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsButtonDisabled(
      !(email && username && phNumber && History && Password)
    );
  }, [email, username, phNumber, History, Password]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //  Start Uploading File

  const uploadFile = (file, urlType) => {
    //Get Storage
    const storage = getStorage(app);

    //Define name according to time not to conflict
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log("error message :", error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgFile(downloadURL);
        });
      }
    );
  };

  //  End Uploading File

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  // const handleChange = (e) => {
  //   setInputs((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  //   console.log(inputs);
  // };

  const checkPassword = (password1) => {
    // Regular expressions for checking password criteria
    const hasLowercase = /[a-z]/.test(password1);
    const hasUppercase = /[A-Z]/.test(password1);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      password1
    );
    const hasDigit = /\d/.test(password1);
    const isLongEnough = password1.length >= 8;

    // Check if all criteria are met
    if (!hasLowercase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasUppercase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    if (!hasDigit) {
      return "Password must contain at least one digit.";
    }
    if (!isLongEnough) {
      return "Password must be at least 8 characters long.";
    }

    // If all criteria are met, return null (indicating the password is valid)
    return null;
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const errorMessage = checkPassword(Password);

    if (errorMessage) {
      window.alert(errorMessage);
    } else {
      const res = await axios.post("/auth/Judgesignup", {
        AdminId: currentAdmin._id,
        name: username,
        email: email,
        password: Password,
        PhNo: phNumber,
        History: History,
        imgUrl: ImgFile,
      });
      try {
        if (res.status === 200) {
          window.alert("Succesfully Added Judges");
          navigate(`/Judges`);
        }
      } catch (err) {
        console.log(res.body.data);
        console.log(err.message);
      }
    }
  };

  return (
    <Box sx={{ ml: { md: 1, sx: 0, sm: 0 } }}>
      <Button onClick={handleClickOpen}>
        <AddOutlinedIcon
          sx={{
            fontSize: 30,
            border: "1px solid #1557a5",
            borderRadius: "50%",
            p: 1,
          }}
        />
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
            Add Judges <FeedIcon sx={{ fontSize: 36 }} />
          </Title>
          <Typography variant="subtitle1"> Current Total Judges : 3</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <Wrapper>
                <Input
                  type="text"
                  placeholder="Judge Name"
                  name="name"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Login Email For Judge"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Phone Number For Judge"
                  name="PhNo"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Login Password For Judge"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Desc
                  placeholder="History Of Judge"
                  name="History"
                  rows={8}
                  onChange={(e) => setHistory(e.target.value)}
                />

                <Label>News Image For Judge:</Label>
                {imgPerc > 0 ? (
                  "Uploading:" + imgPerc + "%"
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                )}
                <Button
                  disabled={imgPerc == 100 ? isButtonDisabled : true}
                  sx={{
                    border: "1px solid #1557a5",
                    "&:hover": {
                      backgroundColor: "#1557a5", // Change background color on hover
                      color: "#fff", // Change text color on hover
                    },
                  }}
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </Wrapper>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
