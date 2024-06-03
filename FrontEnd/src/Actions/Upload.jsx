import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../Redux/ContestantsSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import app from "../firebase";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 360px;
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
  text-align: center;
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

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const { running } = useSelector((state) => state.deadline);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    if (currentUser?.Uploadedvideos.length === 3) {
      const confirmed = window.confirm(
        "You Can Upload Three Videos Per Season.If You Want to upload the video , you need to need delete old video "
      );
      if (confirmed) {
        navigate("/Dashboard/Contestants");
      }
    } else {
      setOpen(true);
      console.log(currentUser.Uploadedvideos.length);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

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
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
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

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/videos", {
        ...inputs,
        tags,
      });
      setOpen(false);
      console.log(res.data._id);
      const VdId = res.data._id;
      if (res.status === 200) {
        setImgPerc(0);
        setVideoPerc(0);
        window.alert("Video Successfully Added ");
        dispatch(uploadVideo(VdId));
        navigate(`/videos/${res.data._id}`);
      } else {
        window.alert("Video Length Is over sized  ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Button
        onClick={handleClickOpen}
        disabled={!running}
        sx={{ ml: { md: 0, sx: 15 } }}
      >
        <VideoCallOutlinedIcon sx={{ fontSize: 30 }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Close onClick={() => setOpen(false)}>X</Close>
          <Title>Upload a New Video</Title>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              <Wrapper>
                <Label>Video:</Label>
                {videoPerc > 0 ? (
                  "Uploading:" + videoPerc
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                  />
                )}
                <Input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                />
                <Desc
                  placeholder="Description"
                  name="desc"
                  rows={8}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  placeholder="Separate the tags with commas."
                  onChange={handleTags}
                />
                <Label>Image:</Label>
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
                  disabled={imgPerc == 100 && videoPerc == 100 ? false : true}
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
