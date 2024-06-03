import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SideBar from "../Components/SideBar";
import { Stack } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import {
  loginStart,
  loginFailure,
  loginSuccess,
} from "../Redux/ContestantsSlice";
import axios from "axios";
import { useEffect } from "react";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;

  background-color: transparent;
  z-index: 999;
`;
const Label = styled.label`
  font-size: 15px;
  color: #555;
  margin: 10px 10px;
`;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Myanmar Idol Voting System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const [selectedCategory, setSelectedCategory] = useState("SignUp");
  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const Roleoptions = ["Viewer", "Contestant"];
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phNumber, setPhoneNumber] = useState("");
  const [NRCNumber, setNRCNumber] = useState("");
  const [Dob, setDOB] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [ReTypePassword, setReTypePassword] = useState("");
  const [role, setRole] = useState(`${Roleoptions[0]}`);
  const [ImgFile, setImgFile] = useState("");
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);

  useEffect(() => {
    setIsButtonDisabled(
      !(
        email &&
        username &&
        phNumber &&
        NRCNumber &&
        Dob &&
        Address &&
        Password &&
        ReTypePassword
      )
    );
  }, [
    email,
    username,
    phNumber,
    NRCNumber,
    Dob,
    Address,
    Password,
    ReTypePassword,
  ]);

  const checkPassword = (password1, password2) => {
    // Regular expressions for checking password criteria
    const hasLowercase = /[a-z]/.test(password1);
    const hasUppercase = /[A-Z]/.test(password1);
    const hasDigit = /\d/.test(password1);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      password1
    );
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
    if (password1 !== password2) {
      return "Two Passwords mustbe the same ";
    }

    // If all criteria are met, return null (indicating the password is valid)
    return null;
  };

  //Check Duplicate Email
  const CheckEmail = async (inputEmail) => {
    const userData = await axios.get("/users/TotalUser");
    console.log(userData.data);
    const checkEmail = userData.data.some((val) => val.email === inputEmail);

    return checkEmail;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const password1 = data.get("password1");
    const password2 = data.get("password2");
    const errorMessage = checkPassword(password1, password2);
    const EmailError = await CheckEmail(data.get("email"));

    console.log(EmailError);
    console.log(ImgFile);
    if (EmailError) {
      window.alert("Users Email is already used.");
    } else {
      // If the password is valid, proceed with form submission
      if (errorMessage) {
        window.alert(errorMessage);
      } else {
        try {
          const res = await axios.post("/auth/signup", {
            name: data.get("username"),
            email: data.get("email"),
            password: password1,
            DateOFBirth: data.get("dob"),
            NRC: data.get("NRC"),
            PhNo: data.get("phNo"),
            Address: data.get("address"),
            Role: role,
            img: ImgFile,
          });

          // Display success message to the user
          window.alert("User successfully added");
          navigate("/signin/Users");
          console.log(res.data);
        } catch (err) {
          // Handle any errors that occur during form submission
          window.alert("An error occurred while adding user");
          console.error("Error:", err);
        }
      }
    }
  };

  //  Start Uploading File

  const uploadFile = (file) => {
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
    img && uploadFile(img);
  }, [img]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <SideBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Box p={3} sx={{ overflowY: "auto", height: "80vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#000", marginBottom: "35px" }}
        >
          <span style={{ color: "#1557a5" }}> SignUp</span>
        </Typography>

        {/* Start SignUp  */}
        <Grid
          container
          component="main"
          sx={{ height: "170vh", justifyContent: "center" }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 2,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Users Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, height: "10vh" }}
              >
                <Autocomplete
                  value={role}
                  onChange={(event, newValue) => {
                    setRole(newValue);
                  }}
                  disableClearable
                  options={Roleoptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Role For Sign Up"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        readOnly: true,
                      }}
                    />
                  )}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phNo"
                  label="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  name="phNo"
                  autoComplete="phNo"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="NRC"
                  label="NRC Number"
                  onChange={(e) => setNRCNumber(e.target.value)}
                  name="NRC"
                  autoComplete="NRC"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  type="date"
                  required
                  fullWidth
                  id="dob"
                  label="Date Of Birth"
                  onChange={(e) => setDOB(e.target.value)}
                  name="dob"
                  autoComplete="dob"
                  autoFocus
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Your Address"
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  autoComplete="address"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password1"
                  label="New Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password1"
                  autoComplete="current-password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="ReType Password"
                  type="password"
                  onChange={(e) => setReTypePassword(e.target.value)}
                  id="password2"
                  autoComplete="current-password"
                />
                <Label>Import Profile Image:</Label>
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
                  type="submit"
                  fullWidth
                  disabled={imgPerc == 100 ? isButtonDisabled : true}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/SignUp/Admins" variant="body2">
                      {"Register As Admin "}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* End SignUp  */}
      </Box>
    </Stack>
  );
}
