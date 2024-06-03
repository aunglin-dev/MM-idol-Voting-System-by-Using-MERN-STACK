import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Paper, IconButton, Box, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { auth } from "../firebase";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [videos, setVideos] = useState(null);
  const [searchVideo, setSearchVideo] = useState([]);

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchTerm("");
    }
  };

  const fetchData = async () => {
    const res = await axios.get("/videos/trend");
    setVideos(res.data);
  };

  const handleOnChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // console.log(e.target.value);

    const searchTermPattern = new RegExp(
      `\\b${searchTerm.replace(/\s/g, "")}(.*?)`,
      "i"
    );
    const searchRes = videos.filter((val) => searchTermPattern.test(val.title));

    setSearchVideo(searchRes);
    console.log(searchVideo.length);
    console.log(searchTerm);
  };

  useEffect(() => {
    fetchData();
  }, [searchVideo]);

  return (
    <Fragment>
      <Paper
        component="form"
        sx={{
          borderRadius: 20,
          border: "1px solid #e3e3e3",
          pl: 2,
          alignContent: "left",
          boxShadow: "none",
          width: { xs: "240px", sm: "240px", md: "370px" },
          ml: { xs: 2, sm: 2, md: 44 },
          pt: 1,
          pb: 1,
        }}
      >
        <input
          className="search-bar"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleOnChange}
        />
      </Paper>

      {searchTerm && (
        <Box
          sx={{
            width: { xs: 250, md: 380 },
            backgroundColor: "#fff",
            height: "auto",
            position: "absolute",
            right: { xs: 150, md: 465 },
            top: { xs: 40, md: 45 },
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 0px 8px #ddd",
            borderRadius: "10px",
            marginTop: "1rem",
            maxHeight: "700px",
            overflow: "visible",
          }}
        >
          {searchVideo.length > 0 ? (
            searchVideo.map((val) => (
              <Link key={val._id} to={`/videos/${val._id}`}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: "8px",
                    textDecoration: "none",
                    overflow: "visible",
                    zIndex: 1,
                  }}
                >
                  <SearchIcon
                    sx={{ p: "2px", color: "blue", marginRight: "20px" }}
                  />
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="#555"
                    sx={{
                      flex: "3",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <span> {val?.title.slice(0, 60)}</span>
                  </Typography>
                </Box>
              </Link>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                padding: "8px",
                textDecoration: "none",
                overflow: "visible",
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="#555"
                sx={{
                  flex: "3",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span>No Results Found</span>
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default SearchBar;
