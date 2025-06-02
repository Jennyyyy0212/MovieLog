import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import burgerImage from '../../imgs/burger.png';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Divider,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ReviewsIcon from "@mui/icons-material/RateReview";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const drawerWidth = 200; // Sidebar width when expanded

const Navbar = ({li}) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 80,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 80,
            transition: "width 0.3s ease-in-out",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
        
        <Divider />

        {/* Navigation Items */}
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" sx={{ justifyContent: open ? "flex-start" : "center" }}>
              <ListItemIcon sx={{ justifyContent: open ? "flex-start" : "center" }}>
                <HomeIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Home" />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/search" sx={{ justifyContent: open ? "flex-start" : "center" }}>
              <ListItemIcon sx={{ justifyContent: open ? "flex-start" : "center" }}>
                <SearchIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Search" />}
            </ListItemButton>
          </ListItem>

          {isAuthenticated ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/my-reviews" sx={{ justifyContent: open ? "flex-start" : "center" }}>
                  <ListItemIcon sx={{ justifyContent: open ? "flex-start" : "center" }}>
                    <ReviewsIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="My Reviews" />}
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={logout} sx={{ justifyContent: open ? "flex-start" : "center" }}>
                  <ListItemIcon sx={{ justifyContent: open ? "flex-start" : "center" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Logout" />}
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/login" sx={{ justifyContent: open ? "flex-start" : "center" }}>
                  <ListItemIcon sx={{ justifyContent: open ? "flex-start" : "center" }}>
                    <LoginIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Login" />}
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/register" sx={{ justifyContent: open ? "flex-start" : "center" }}>
                  <ListItemIcon sx={{ justifyContent: open ? "flex-start" : "center" }}>
                    <PersonAddIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Register" />}
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;