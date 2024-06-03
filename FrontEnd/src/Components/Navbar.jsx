import { Stack, Typography, Badge, Button } from "@mui/material";
import { Link, Router } from "react-router-dom";
import { SearchBar } from "./";
import UserProfile from "./UserProfile";
import Notification from "./Notification";
import Upload from "../Actions/Upload";
import myImage from "../Image/Logo_of_Myanmar_Idol-removebg-preview.png";
import { useSelector } from "react-redux";
import SignInSide from "../Actions/SigInSide";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentAdmin } = useSelector((state) => state.admin);

  const marginValue = currentAdmin || currentUser?.Role === "Judge" ? 50 : 40;
  const smallDeviceValue = currentUser?.Role == "Contestant" ? -1 : 2;
  return (
    <Stack
      direction="row"
      alignItems="center"
      flex={4}
      p={2}
      sx={{
        position: "sticky",
        background: "#f1f1f1",
        top: 0,
        height: 30,

        borderBottom: "0.5px solid rgba(0,0,0,0.2)",
      }}
    >
      <Link to="/">
        <img
          src={myImage}
          alt="logo"
          height={65}
          style={{ boxShadow: "10px" }}
        />
      </Link>

      <SearchBar />

      {currentUser || currentAdmin ? (
        <Stack
          direction="row"
          sx={{
            ml: {
              md: currentUser?.Role === "Contestant" ? 30 : marginValue,
              xs:
                currentAdmin || currentUser?.Role === "Judge"
                  ? 10
                  : smallDeviceValue,
            },
          }}
          spacing={{ xs: 1, sm: 2, md: 1 }}
        >
          {currentUser && (
            <>
              {currentUser?.Role !== "Judge" && (
                <>
                  {" "}
                  <Notification />
                </>
              )}

              {currentUser?.Role === "Contestant" && (
                <>
                  {" "}
                  <Upload />
                </>
              )}
            </>
          )}

          <UserProfile />
        </Stack>
      ) : (
        <Stack sx={{ ml: { md: "330px", sm: 4, xs: 4 } }}>
          <Link to="signin/Users">
            <Button variant="contained" sx={{ backgroundColor: "#1557a5" }}>
              Sign In
            </Button>
          </Link>
        </Stack>
      )}
    </Stack>
  );
};

export default Navbar;
