import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Navbar,
  Feed,
} from "./Components";
import SignInSide from "./Actions/SigInSide";
import SignUp from "./Actions/SignUp";
import SignUpAdmins from "./Actions/SingUpAdmin";
import SignInAdmin from "./Actions/SignInAdmin";
import Dashboard from "./Pages/Dashboard.jsx";
import News from "./Pages/News.jsx";
import ContentManagement from "./Pages/ContentManagement.jsx";
import Trends from "./Pages/Trends.jsx";
import Favorite from "./Pages/Favourite.jsx";
import Judges from "./Pages/Judges.jsx";
import TopFinalists from "./Pages/TopFinalist.jsx";
import Privacy from "./Pages/Privacy.jsx";

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#f1f1f1" }}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Feed />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/News" element={<News />} />
        <Route path="/Judges" element={<Judges />} />
        <Route path="/favourites" element={<Favorite />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/videos/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/Signin/Users" element={<SignInSide />} />
        <Route path="/Signin/Admins" element={<SignInAdmin />} />
        <Route path="/Dashboard/Contestants" element={<ContentManagement />} />
        <Route path="/TopFinalists" element={<TopFinalists />} />
        <Route path="/SignUp/Contestants" element={<SignUp />} />
        <Route path="/SignUp/Admins" element={<SignUpAdmins />} />
        <Route path="/Dashboard/Admin" element={<Dashboard />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
