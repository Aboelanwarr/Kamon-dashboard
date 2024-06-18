import * as React from 'react';
import Logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, AppBar, Box, Typography, Toolbar } from '@mui/material';
import './Appbar.css';
export default function Navbar({ onLogout }) {

  const settings = [
    { name: 'Profile', action: () => console.log('Profile clicked') },
    { name: 'Account', action: () => console.log('Account clicked') },
    { name: 'Dashboard', action: () => navigate('/home') },
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
      <AppBar position="sticky" sx={{ backgroundColor: '#386351', zIndex: 1100 }} className='appbar'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/Home">
              <svg width="136" height="26" viewBox="0 0 136 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.483 25L7.78166 14.232V25H0.95148V0.432256H7.78166V11.026L15.4133 0.432256H23.289L14.2634 12.3502L23.742 25H15.483ZM41.7787 20.9925H33.0668L31.7426 25H24.5639L33.5198 0.432256H41.3954L50.3165 25H43.103L41.7787 20.9925ZM40.0712 15.7653L37.4228 7.82L34.8092 15.7653H40.0712ZM96.889 25.2439C94.5891 25.2439 92.4749 24.7096 90.5467 23.6409C88.6184 22.549 87.0851 21.0506 85.9468 19.1456C84.8316 17.2173 84.2741 15.0451 84.2741 12.629C84.2741 10.2129 84.8316 8.05232 85.9468 6.14731C87.0851 4.21906 88.6184 2.7206 90.5467 1.65193C92.4749 0.583264 94.5891 0.0489299 96.889 0.0489299C99.2122 0.0489299 101.326 0.583264 103.231 1.65193C105.16 2.7206 106.681 4.21906 107.796 6.14731C108.912 8.05232 109.469 10.2129 109.469 12.629C109.469 15.0451 108.912 17.2173 107.796 19.1456C106.681 21.0506 105.16 22.549 103.231 23.6409C101.303 24.7096 99.189 25.2439 96.889 25.2439ZM96.889 18.9016C98.6314 18.9016 100.002 18.3324 101.001 17.1941C102.023 16.0557 102.534 14.534 102.534 12.629C102.534 10.6775 102.023 9.14422 101.001 8.02909C100.002 6.89073 98.6314 6.32155 96.889 6.32155C95.1234 6.32155 93.7411 6.89073 92.7421 8.02909C91.7431 9.14422 91.2437 10.6775 91.2437 12.629C91.2437 14.5573 91.7431 16.0906 92.7421 17.2289C93.7411 18.3441 95.1234 18.9016 96.889 18.9016ZM135.295 25H128.465L119.37 11.2699V25H112.54V0.432256H119.37L128.465 14.3366V0.432256H135.295V25Z" fill="#E1D9C3" />
                <path d="M81.2224 0.432256V25H74.3923V11.4442L69.7575 25H64.0424L59.3728 11.3396V25H52.5427V0.432256H60.8016L66.9697 16.3926L72.9983 0.432256H81.2224Z" fill="#50997B" />
              </svg>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography variant="h5"  sx={{ display: "flex", alignItems: "center", gap: "10px", color:"#e1d9c3"}}>
                  {/* {user.name} */}
                  Ahmed Ismail
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