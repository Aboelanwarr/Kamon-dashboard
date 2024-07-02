import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import usePasswordVisibility from '../hooks/usePasswordVisibility'; // Adjust the path as necessary
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const theme = createTheme({
  palette: {
    primary: {
      main: '#386351',
    },
    secondary: {
      main: '#E1D9C3',
    },
  },
});

export default function SignUp() {
  const { showPassword, handlePasswordChange, togglePasswordVisibility } = usePasswordVisibility();
  const [image, setImage] = useState(null);
  const [fileInput, setFileInput] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setFileInput(e.target);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("employeeId", e.target['id'].value);
    formData.append("email", e.target['email'].value);
    formData.append("password", e.target['password'].value);
    if (image) {
        formData.append("profileImg", fileInput.files[0]);
    }

    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow"
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/employeeAccount`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          toast.success("Employee account added successfully");
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to add employee account");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Employee Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emp_id"
                  label="Employee ID"
                  name="id"
                  autoComplete="emp_id"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:2}}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ bgcolor: 'secondary.main', color: 'black' }}
                >
                  Upload Profile Image
                  <input
                    type="file"
                    hidden
                    accept="image/jpeg"
                    onChange={handleImageChange}
                  />
                </Button>
                {image && <img src={URL.createObjectURL(image)} alt="" style={{width: 100, height: 100}} />}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
