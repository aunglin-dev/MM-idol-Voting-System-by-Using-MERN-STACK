import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tooltip, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const VdUploadModal = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(id);

  const fetchSpecificVd = async () => {
    const VdData = await axios.get(`/videos/find/${id}`);
    setVideo(VdData.data);
    console.log(video.data);
    console.log(video.title);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const UpdateChanges = async () => {
    const updateVideo = await axios.put(`/videos/${id}`, {
      title,
      desc,
      tags,
    });
    if (updateVideo.status === 200) {
      const resDetailVidoe = await axios.post(`/videos/saveVideoDetail`, {
        videoId: id,
        Transaction: "Update",
      });
      resDetailVidoe.status === 200 &&
        window.alert("Video is successfully updated");
    } else {
      window.alert("Failed to delete video");
    }
    setOpen(false);
  };

  useEffect(() => {
    fetchSpecificVd();
    setTitle(video.title);
    setDesc(video.desc);
    setTags(video.tags);
  }, [open]);

  return (
    <div>
      <Tooltip title="Edit This Video">
        <IconButton onClick={handleOpen}>
          <EditIcon sx={{ color: "#1557a5" }} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <span>
              {" "}
              <EditIcon sx={{ color: "#1557a5" }} />
            </span>{" "}
            Edit The Video
          </Typography>
          <TextField
            id="Title"
            label="Title"
            fullWidth
            value={title}
            onChange={handleChangeTitle}
            variant="standard"
            name="title"
            sx={{ mt: 4 }}
          />
          <TextField
            id="standard-basic"
            label="Description"
            fullWidth
            name="desc"
            value={desc}
            variant="filled"
            onChange={handleChangeDesc}
            sx={{ mt: 4 }}
          />
          <TextField
            label="Tags"
            fullWidth
            variant="standard"
            sx={{ mt: 4 }}
            onChange={handleTags}
            value={tags?.join(",")}
          />
          <Button
            variant="outlined"
            onClick={UpdateChanges}
            sx={{ mt: 4, color: "#1557a5 " }}
          >
            Confirm Changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default VdUploadModal;
