import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useEffect } from "react";
import ManageNews2 from "./ManageJugdes";

const ManageNews = () => {
  const [inputs, setInputs] = useState({});
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);

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
      res.status === 200 && window.alert("Succesfully Added News");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Box sx={{ pb: 3, borderBottom: "1px solid grey" }}>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Upload News{" "}
      </Typography>
      <Typography variant="body" sx={{ mt: 3 }}>
        Current Total News: 2 <ManageNews2 />
      </Typography>
    </Box>
  );
};

export default ManageNews;
