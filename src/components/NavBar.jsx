import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userIn, userOut } from "../features/userSlice";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { current } from "@reduxjs/toolkit";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser); // 📌 קבלת המשתמש מה-Redux
  const [anchorElUser, setAnchorElUser] = useState(null); // לוגיקת תפריט משתמש

  // 🎯 בעת טעינת הקומפוננטה - טוען את המשתמש מה-Local Storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(userIn(storedUser));
    }
  }, [dispatch]);

  // 📌 התנתקות - מוחק מה-Redux ומה-Local Storage
  const signOut = () => {
    console.log("User signed out");
    dispatch(userOut());
    localStorage.removeItem("user"); // מוחק את המשתמש מה-Local Storage
  };

  // 📌 תפריט משתמש
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ height: '60px' }}>
      <Toolbar disableGutters sx={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/" sx={{ color: 'white', mr: 2 }}>
            <HomeIcon />
          </IconButton>

          {user?.userRole !== 'admin' && (
            <IconButton component={Link} to="/BigCart" sx={{ color: 'white', mr: 2 }}>
              <ShoppingCartIcon />
            </IconButton>
          )}


          {user?.userRole!="admin" && (
            <Button component={Link} to="/OrdersList" sx={{ color: 'white' }}>
              MY ORDERS
            </Button>
          )}




          {user?.userRole === 'admin' && (
            <Button component={Link} to="/AddTrip" sx={{ color: 'white' }}>
              Add Trip
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', mr: 2 }}>
            Welcome {user ? user.userName : "Guest"}
          </Typography>

          {user ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disabled>
                  <Typography textAlign="center">{user.userName}</Typography>
                </MenuItem>
                <MenuItem onClick={signOut}>
                  <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={Link} to="/login" sx={{ color: 'white' }}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
