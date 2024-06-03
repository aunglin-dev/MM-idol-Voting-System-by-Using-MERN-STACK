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

const Wrapper = styled.div`
  width: 400px;
  height: 350px;
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

export default function ManageNews2() {
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState({});
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [news, setnews] = useState([]);
  const fetchNews = async () => {
    const res = await axios.get(`/news/lastest`);
    setnews(res.data);
  };
  useEffect(() => {
    fetchNews();
  }, [news]);

  const navigate = useNavigate();

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
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  //  End Uploading File

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/news", {
      ...inputs,
    });
    try {
      if (res.status === 200) {
        window.alert("Succesfully Added News");
        navigate(`/News`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Box>
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
            Upload News <FeedIcon sx={{ fontSize: 36 }} />
          </Title>
          <Typography variant="subtitle1">
            {" "}
            Current Total News : {news?.length}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <Wrapper>
                <Input
                  type="text"
                  placeholder="Title Of News"
                  name="title"
                  onChange={handleChange}
                />
                <Desc
                  placeholder="Description"
                  name="desc"
                  rows={8}
                  onChange={handleChange}
                />

                <Label>News Image For News:</Label>
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
                  disabled={imgPerc == 100 ? false : true}
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
