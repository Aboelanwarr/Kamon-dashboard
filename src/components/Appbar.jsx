import * as React from 'react';
import Logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, AppBar, Box, Typography, Toolbar } from '@mui/material';

export default function Navbar({ onLogout }) {

  const settings = [
    { name: 'Profile', action: () => console.log('Profile clicked') },
    { name: 'Account', action: () => console.log('Account clicked') },
    { name: 'Dashboard', action: () => navigate('/dashboard') },
    { name: 'Logout', action: onLogout },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingAction = (action) => {
    handleCloseUserMenu();
    action();
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/Home"><img src={Logo} alt="logo" style={{ height: "25px", maxWidth: "6.5rem" }} /></Link>
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography variant="h6" color="initial" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  Ahmed Ehab
                  <Avatar alt="Ahmed Ehab" src="/static/images/avatar/2.jpg" />
                </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => handleSettingAction(setting.action)}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}