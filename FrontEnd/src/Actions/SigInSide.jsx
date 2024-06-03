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
import myImage from "../Image/Logo_of_Myanmar_Idol-removebg-preview.png";
import SideBar from "../Components/SideBar";
import { Stack, Autocomplete } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginStart,
  loginFailure,
  loginSuccess,
} from "../Redux/ContestantsSlice";
import axios from "axios";
import { useEffect } from "react";

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

export default function SignInSide() {
  const [selectedCategory, setSelectedCategory] = useState("SignIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const Roleoptions = ["Viewer", "Contestant", "Judge"];
  const [role, setRole] = useState(`${Roleoptions[0]}`);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/signin", {
        email: data.get("email"),
        password: data.get("password"),
        Role: role,
      });

      if (res.status == 200) {
        window.alert("Welcome From Myanmar Idol ");
        dispatch(loginSuccess(res.data));
        console.log(res.data);
        navigate("/");
      }
    } catch (err) {
      window.alert("Email or Password Is Wrong ");
      dispatch(loginFailure);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(!(email && password));
  }, [email, password, role]);

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
          Users <span style={{ color: "#1557a5" }}>Sign In</span>
        </Typography>

        {/* Start Signin  */}
        <Grid
          container
          component="main"
          sx={{ height: "85vh", justifyContent: "center" }}
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
              <img
                src={myImage}
                alt="logo"
                height={55}
                style={{ boxShadow: "10px" }}
              />

              <Typography component="h1" variant="h5">
                Sign in
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
                  options={Roleoptions}
                  disableClearable
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Role For Login"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: null,
                        readOnly: true,
                      }}
                    />
                  )}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#1557a5" }}
                  disabled={isButtonDisabled}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/Signin/Admins" variant="body2">
                      Login As Admin
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/SignUp/Contestants" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* End Signin  */}
      </Box>
    </Stack>
  );
}
