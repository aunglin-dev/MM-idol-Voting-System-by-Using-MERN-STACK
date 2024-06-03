import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/ContestantsSlice";
import { Adminlogout } from "../Redux/AdminSlice";
import { useSelector } from "react-redux";
import { demoProfilePicture } from "../Utils/Constants";
const UserProfile = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const settings = [
    {
      name: "Profile",
      onClick: () => {
        console.log("profile");
      },
    },

    {
      name: "Logout",
      onClick: () => {
        const confirmed = window.confirm("Are You Really Want to logout");
        if (confirmed) {
          dispatch(logout());
          dispatch(Adminlogout());
        }
      },
    },
  ];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0, ml: { md: 1, xs: 0 } }}
        >
          <Avatar
            alt="Remy Sharp"
            src={currentUser?.img || currentUser?.imgUrl || demoProfilePicture}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
            <Button onClick={setting.onClick}>{setting.name}</Button>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserProfile;
