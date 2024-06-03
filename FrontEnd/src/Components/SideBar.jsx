import { Stack, Typography, Box } from "@mui/material";
import React, { Fragment } from "react";
import { categories } from "../Utils/Constants";
import { Link } from "react-router-dom";
import FeedIcon from "@mui/icons-material/Feed";
import GradeIcon from "@mui/icons-material/Grade";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import BalanceIcon from "@mui/icons-material/Balance";
import HailIcon from "@mui/icons-material/Hail";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SecurityIcon from "@mui/icons-material/Security";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useSelector } from "react-redux";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      <Link color="inherit" href="https://mui.com/">
        MIVS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const SideBar = ({ selectedCategory, setSelectedCategory }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentAdmin } = useSelector((state) => state.admin);

  const CheckUser = currentAdmin || currentUser ? true : false;
  console.log(CheckUser);

  return (
    <Box
      sx={{
        height: { sx: "auto", md: "92vh" },
        borderRight: "1px solid #3d3d3d",
        px: { sx: 0, md: 2 },
      }}
    >
      <Stack
        direction="row"
        sx={{
          overflow: "auto",
          height: { sx: "auto", md: "95%" },
          flexDirection: { md: "column" },
        }}
      >
        {/* {categories.map((val) => (
        <Link to={`${val.name}`}>
          <button
            className="category-btn"
            onClick={() => setSelectedCategory(val.name)}
            style={{
  
              background: val.name === "#1557a5",
              color: "#000",
            }}
            key={val.name}
          >
            <span
              style={{
                color: val.name === selectedCategory ? "white" : "#1557a5",
                marginRight: "15px",
              }}
            >
              {val.icon}
            </span>
            <span
              style={{
                opacity: val.name === selectedCategory ? "1" : "0.8",
              }}
            >
              {val.name}
            </span>
          </button>
        </Link>
      ))} */}

        {/* Start Home Page */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <button
            className="category-btn"
            onClick={() => setSelectedCategory("Home")}
            style={{
              background:
                selectedCategory === "Home" ? "#1557a5" : "transperent",
              color: "#000",
            }}
          >
            <span
              style={{
                color: selectedCategory === "Home" ? "white" : "#1557a5",

                marginRight: "15px",
              }}
            >
              {categories[0].icon}
            </span>
            <span
              style={{
                opacity: selectedCategory === "Home" ? "1" : "0.8",
                color: selectedCategory === "Home" ? "white" : "#000",
              }}
            >
              Home
            </span>
          </button>
        </Link>
        {/* End Home Page */}
        {/* Start News Page */}
        <Link to="/News" style={{ textDecoration: "none", color: "inherit" }}>
          <button
            className="category-btn"
            onClick={() => setSelectedCategory("News")}
            style={{
              background:
                selectedCategory === "News" ? "#1557a5" : "transperent",
              color: "#000",
            }}
          >
            <span
              style={{
                color: selectedCategory === "News" ? "white" : "#1557a5",

                marginRight: "15px",
              }}
            >
              <FeedIcon />
            </span>
            <span
              style={{
                opacity: selectedCategory === "News" ? "1" : "0.8",
                color: selectedCategory === "News" ? "white" : "#000",
              }}
            >
              News
            </span>
          </button>
        </Link>
        {/* End News Page */}

        {/* Start FAVOURite Page */}
        {currentUser && (
          <Link
            to="/favourites"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button
              className="category-btn"
              onClick={() => setSelectedCategory("Favourite")}
              style={{
                background:
                  selectedCategory === "Favourite" ? "#1557a5" : "transperent",
                color: "#000",
              }}
            >
              <span
                style={{
                  color: selectedCategory === "Favourite" ? "white" : "#1557a5",

                  marginRight: "15px",
                }}
              >
                <GradeIcon />
              </span>
              <span
                style={{
                  opacity: selectedCategory === "Favourite" ? "1" : "0.8",
                  color: selectedCategory === "Favourite" ? "white" : "#000",
                }}
              >
                Favourite
              </span>
            </button>
          </Link>
        )}

        {/* End FAVOURite Page */}

        {/* Start Trend Page */}
        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
          <button
            className="category-btn"
            onClick={() => setSelectedCategory("Trend")}
            style={{
              background:
                selectedCategory === "Trends" ? "#1557a5" : "transperent",
              color: "#000",
            }}
          >
            <span
              style={{
                color: selectedCategory === "Trends" ? "white" : "#1557a5",

                marginRight: "15px",
              }}
            >
              <WhatshotIcon />
            </span>
            <span
              style={{
                opacity: selectedCategory === "Trends" ? "1" : "0.8",
                color: selectedCategory === "Trends" ? "white" : "#000",
              }}
            >
              Trend
            </span>
          </button>
        </Link>
        {/* End Trend Page */}

        {/* Start Judges Page */}
        <Link to="/Judges" style={{ textDecoration: "none", color: "inherit" }}>
          <button
            className="category-btn"
            onClick={() => setSelectedCategory("Judges")}
            style={{
              background:
                selectedCategory === "Judges" ? "#1557a5" : "transperent",
              color: "#000",
            }}
          >
            <span
              style={{
                color: selectedCategory === "Judges" ? "white" : "#1557a5",

                marginRight: "15px",
              }}
            >
              <BalanceIcon />
            </span>
            <span
              style={{
                opacity: selectedCategory === "Judges" ? "1" : "0.8",
                color: selectedCategory === "Judges" ? "white" : "#000",
              }}
            >
              Judges
            </span>
          </button>
        </Link>
        {/* End Judges Page */}

        {/* Start Top Finalists Page */}
        <Link
          to="/TopFinalists"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <button
            className="category-btn"
            onClick={() => setSelectedCategory("TopFinalists")}
            style={{
              background:
                selectedCategory === "TopFinalists" ? "#1557a5" : "transperent",
              color: "#000",
            }}
          >
            <span
              style={{
                color:
                  selectedCategory === "TopFinalists" ? "white" : "#1557a5",

                marginRight: "15px",
              }}
            >
              <HailIcon />
            </span>
            <span
              style={{
                opacity: selectedCategory === "TopFinalists" ? "1" : "0.8",
                color: selectedCategory === "TopFinalists" ? "white" : "#000",
              }}
            >
              Finalists
            </span>
          </button>
        </Link>
        {/* End Top FinalistsPage */}

        {/* Start SignIn Page */}

        {!CheckUser && (
          <Link
            to="/Signin/Users"
            style={{
              textDecoration: "none",
              color: "inherit",
              borderTop: "1px solid grey",
            }}
          >
            <button
              onClick={() => setSelectedCategory("SignIn")}
              className="category-btn"
              style={{
                color: "#000",
                background:
                  selectedCategory === "SignIn" ? "#1557a5" : "transperent",
                color: "#000",
              }}
            >
              <span
                style={{
                  color: selectedCategory === "SignIn" ? "white" : "#1557a5",
                  marginRight: "15px",
                }}
              >
                <LoginIcon />
              </span>
              <span
                style={{
                  opacity: selectedCategory === "SignIn" ? "1" : "0.8",
                  color: selectedCategory === "SignIn" ? "white" : "#000",
                }}
              >
                SignIn
              </span>
            </button>
          </Link>
        )}

        {/* End SignIn Page */}

        {/* Start SignUp Page */}
        {!CheckUser && (
          <Link
            to="/SignUp/Contestants"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button
              onClick={() => setSelectedCategory("SignUp")}
              className="category-btn"
              style={{
                color: "#000",
                background:
                  selectedCategory === "SignUp" ? "#1557a5" : "transperent",
                color: "#000",
              }}
            >
              <span
                style={{
                  color: selectedCategory === "SignUp" ? "white" : "#1557a5",
                  marginRight: "15px",
                }}
              >
                <HowToRegIcon />
              </span>
              <span
                style={{
                  opacity: selectedCategory === "SignUp" ? "1" : "0.8",
                  color: selectedCategory === "SignUp" ? "white" : "#000",
                }}
              >
                SignUp
              </span>
            </button>
          </Link>
        )}

        {/* Start Dashboard Page */}
        {currentAdmin && (
          <Link
            to="/Dashboard/Admin"
            style={{
              textDecoration: "none",
              color: "inherit",
              borderTop: "1px solid grey",
            }}
          >
            <button
              onClick={() => setSelectedCategory("Dashboard")}
              className="category-btn"
              style={{
                color: "#000",
                background:
                  selectedCategory === "Dashboard" ? "#1557a5" : "transperent",
                color: "#000",
              }}
            >
              <span
                style={{
                  color: selectedCategory === "Dashboard" ? "white" : "#1557a5",
                  marginRight: "15px",
                }}
              >
                <DashboardIcon />
              </span>
              <span
                style={{
                  opacity: selectedCategory === "Dashboard" ? "1" : "0.8",
                  color: selectedCategory === "Dashboard" ? "white" : "#000",
                }}
              >
                Dashboard
              </span>
            </button>
          </Link>
        )}

        {/* End Dashboard Page */}

        {/* Start ContentManagement Page */}
        {currentUser && currentUser?.Role !== "Judge" && (
          <Link
            to="/Dashboard/Contestants"
            style={{
              textDecoration: "none",
              color: "inherit",
              borderTop: "1px solid grey",
            }}
          >
            <button
              onClick={() => setSelectedCategory("Dashboard")}
              className="category-btn"
              style={{
                color: "#000",
                background:
                  selectedCategory === "Dashboard" ? "#1557a5" : "transperent",
                color: "#000",
              }}
            >
              <span
                style={{
                  color: selectedCategory === "Dashboard" ? "white" : "#1557a5",
                  marginRight: "15px",
                }}
              >
                <VideoLibraryIcon />
              </span>
              <span
                style={{
                  opacity: selectedCategory === "Dashboard" ? "1" : "0.8",
                  color: selectedCategory === "Dashboard" ? "white" : "#000",
                }}
              >
                Dashboard
              </span>
            </button>
          </Link>
        )}

        {/* End ContentManagement Page */}

        {/* Start Term and Privacy Page */}
        <Link
          to="/Privacy"
          style={{
            textDecoration: "none",
            color: "inherit",
            borderTop: "1px solid grey",
          }}
        >
          <button
            onClick={() => setSelectedCategory("Privacy")}
            className="category-btn"
            style={{
              color: "#000",
              background:
                selectedCategory === "Privacy" ? "#1557a5" : "transperent",
              color: "#000",
            }}
          >
            <span
              style={{
                color: selectedCategory === "Privacy" ? "white" : "#1557a5",
                marginRight: "15px",
              }}
            >
              <SecurityIcon />
            </span>

            <span
              style={{
                opacity: selectedCategory === "Privacy" ? "1" : "0.8",
                color: selectedCategory === "Privacy" ? "white" : "#000",
              }}
            >
              Privacy
            </span>
          </button>
        </Link>
        {/* End Term and PrivacyPage */}
      </Stack>

      <Typography body="2" variant="button" sx={{ mt: 1.5, color: "#000" }}>
        {Copyright()}
      </Typography>
    </Box>
  );
};

export default SideBar;
