import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import usePasswordVisibility from '../hooks/usePasswordVisibility'; // Adjust the path as necessary
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { toast } from 'react-toastify';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="#">
        KAMON
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const {
    showPassword,
    handlePasswordChange,
    togglePasswordVisibility,
  } = usePasswordVisibility();


  const handleSubmit = (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": event.target['email'].value,
      "password": event.target['password'].value
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/auth/login`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to login');
        }
        return response.json();
      })
      .then((result) => {
        if (result.status === "success") {
          localStorage.setItem('token', true);
          navigate('/home');
        }
        else {
          localStorage.setItem('token', false);
        }
        console.log(result);
        toast.success('Login successful');
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className='login-page-body' style={{
      backgroundColor: '#386351',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" className='login-container' sx={{ border: '3px solid #E1D9C3', borderRadius: '10px' }}>
          <CssBaseline />
          <Box className='login-box'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ m: 1, width: '210px', height: '191px' }}>
              <svg width="210" height="191" viewBox="0 0 210 191" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M191.573 97.0962C205.451 81.9323 209.851 58.4168 202.429 39.0847C195.007 19.7525 176.137 5.58041 155.878 4.12329C125.171 1.91439 93.2106 31.6855 91.9393 63.1416C91.6283 70.8344 93.6982 79.5591 100.238 83.374C106.325 86.9247 114.633 84.6524 119.199 79.2164C123.765 73.7803 124.914 65.9449 123.475 58.9312C122.036 51.9176 118.293 45.6122 113.995 39.9522C99.4869 20.8463 79.3632 2.3076 54.1217 4.12329C33.8632 5.58078 14.9931 19.7525 7.57087 39.0847C0.148613 58.4168 4.54928 81.9323 18.4266 97.0962" stroke="#E1D9C3" stroke-width="6.18942" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M133.79 163.308L113.257 183.735C108.738 188.23 101.496 188.063 97.1812 183.361C91.3888 177.05 83.5972 168.672 78.2056 163.308" stroke="#E1D9C3" stroke-width="6.18942" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M60.1721 143.727C68.6964 135.605 66.608 119.144 55.5075 106.959C44.407 94.7747 28.498 91.481 19.9737 99.6027C11.4494 107.724 13.5378 124.186 24.6383 136.37C35.7388 148.555 51.6478 151.849 60.1721 143.727Z" stroke="#E1D9C3" stroke-width="6.18942" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M187.221 103.233L158.85 136.959" stroke="#E1D9C3" stroke-width="6.18942" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M147.73 121.724L169.102 98.5749C179.807 88.7808 205.789 108.871 194.144 124.411L172.982 147.334" stroke="#E1D9C3" stroke-width="6.18942" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </Box>
            <Box sx={{ m: 1, width: '130px', height: '50px' }}>
              <svg width="136" height="26" viewBox="0 0 136 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.483 25L7.78166 14.232V25H0.95148V0.432256H7.78166V11.026L15.4133 0.432256H23.289L14.2634 12.3502L23.742 25H15.483ZM41.7787 20.9925H33.0668L31.7426 25H24.5639L33.5198 0.432256H41.3954L50.3165 25H43.103L41.7787 20.9925ZM40.0712 15.7653L37.4228 7.82L34.8092 15.7653H40.0712ZM96.889 25.2439C94.5891 25.2439 92.4749 24.7096 90.5467 23.6409C88.6184 22.549 87.0851 21.0506 85.9468 19.1456C84.8316 17.2173 84.2741 15.0451 84.2741 12.629C84.2741 10.2129 84.8316 8.05232 85.9468 6.14731C87.0851 4.21906 88.6184 2.7206 90.5467 1.65193C92.4749 0.583264 94.5891 0.0489299 96.889 0.0489299C99.2122 0.0489299 101.326 0.583264 103.231 1.65193C105.16 2.7206 106.681 4.21906 107.796 6.14731C108.912 8.05232 109.469 10.2129 109.469 12.629C109.469 15.0451 108.912 17.2173 107.796 19.1456C106.681 21.0506 105.16 22.549 103.231 23.6409C101.303 24.7096 99.189 25.2439 96.889 25.2439ZM96.889 18.9016C98.6314 18.9016 100.002 18.3324 101.001 17.1941C102.023 16.0557 102.534 14.534 102.534 12.629C102.534 10.6775 102.023 9.14422 101.001 8.02909C100.002 6.89073 98.6314 6.32155 96.889 6.32155C95.1234 6.32155 93.7411 6.89073 92.7421 8.02909C91.7431 9.14422 91.2437 10.6775 91.2437 12.629C91.2437 14.5573 91.7431 16.0906 92.7421 17.2289C93.7411 18.3441 95.1234 18.9016 96.889 18.9016ZM135.295 25H128.465L119.37 11.2699V25H112.54V0.432256H119.37L128.465 14.3366V0.432256H135.295V25Z" fill="#E1D9C3" />
                <path d="M81.2224 0.432256V25H74.3923V11.4442L69.7575 25H64.0424L59.3728 11.3396V25H52.5427V0.432256H60.8016L66.9697 16.3926L72.9983 0.432256H81.2224Z" fill="#50997B" />
              </svg>
            </Box>
            <Typography sx={{ width: '130px', height: '50px' }}>
              <svg width="140" height="26" viewBox="0 0 73 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.274 0.519999H4.46V15.332H11.166V19H0.274V0.519999ZM19.7546 19.336C18.4946 19.336 17.3746 19.0793 16.3946 18.566C15.4239 18.0433 14.6586 17.3293 14.0986 16.424C13.5479 15.5093 13.2726 14.464 13.2726 13.288C13.2726 12.112 13.5479 11.0667 14.0986 10.152C14.6586 9.228 15.4239 8.5 16.3946 7.968C17.3746 7.436 18.4946 7.17 19.7546 7.17C21.0146 7.17 22.1252 7.436 23.0866 7.968C24.0479 8.5 24.7992 9.228 25.3406 10.152C25.8819 11.0667 26.1526 12.112 26.1526 13.288C26.1526 14.464 25.8819 15.5093 25.3406 16.424C24.7992 17.3293 24.0479 18.0433 23.0866 18.566C22.1252 19.0793 21.0146 19.336 19.7546 19.336ZM19.7546 15.836C20.2399 15.836 20.6599 15.7287 21.0146 15.514C21.3692 15.2993 21.6446 14.996 21.8406 14.604C22.0366 14.212 22.1346 13.7687 22.1346 13.274C22.1346 12.77 22.0366 12.322 21.8406 11.93C21.6446 11.538 21.3692 11.23 21.0146 11.006C20.6599 10.782 20.2399 10.67 19.7546 10.67C19.2692 10.67 18.8446 10.782 18.4806 11.006C18.1259 11.23 17.8459 11.538 17.6406 11.93C17.4446 12.322 17.3466 12.77 17.3466 13.274C17.3466 13.7687 17.4446 14.212 17.6406 14.604C17.8459 14.996 18.1259 15.2993 18.4806 15.514C18.8446 15.7287 19.2692 15.836 19.7546 15.836ZM34.4014 25.146C33.5987 25.146 32.8007 25.076 32.0074 24.936C31.2234 24.796 30.4907 24.558 29.8094 24.222C29.1281 23.886 28.5541 23.424 28.0874 22.836L30.5794 20.246C30.7941 20.498 31.0554 20.7453 31.3634 20.988C31.6807 21.2307 32.0681 21.4313 32.5254 21.59C32.9921 21.7487 33.5567 21.828 34.2194 21.828C34.8354 21.828 35.3721 21.7207 35.8294 21.506C36.2867 21.2913 36.6414 20.9787 36.8934 20.568C37.1547 20.1573 37.2854 19.658 37.2854 19.07V18.79H41.4714V19.322C41.4714 20.5913 41.1541 21.66 40.5194 22.528C39.8941 23.396 39.0494 24.0493 37.9854 24.488C36.9214 24.9267 35.7267 25.146 34.4014 25.146ZM37.2854 19V17.138C37.2014 17.3247 36.9867 17.5953 36.6414 17.95C36.3054 18.3047 35.8574 18.6267 35.2974 18.916C34.7374 19.196 34.0841 19.336 33.3374 19.336C32.2174 19.336 31.2374 19.0653 30.3974 18.524C29.5574 17.9733 28.9041 17.2407 28.4374 16.326C27.9707 15.402 27.7374 14.38 27.7374 13.26C27.7374 12.14 27.9707 11.1227 28.4374 10.208C28.9041 9.284 29.5574 8.54667 30.3974 7.996C31.2374 7.44533 32.2174 7.17 33.3374 7.17C34.0561 7.17 34.6861 7.28667 35.2274 7.52C35.7687 7.744 36.2074 8.01467 36.5434 8.332C36.8794 8.64 37.1127 8.92467 37.2434 9.186V7.506H41.4714V19H37.2854ZM31.9094 13.26C31.9094 13.7827 32.0307 14.254 32.2734 14.674C32.5161 15.0847 32.8381 15.4067 33.2394 15.64C33.6501 15.8733 34.1027 15.99 34.5974 15.99C35.1107 15.99 35.5634 15.8733 35.9554 15.64C36.3474 15.4067 36.6554 15.0847 36.8794 14.674C37.1127 14.254 37.2294 13.7827 37.2294 13.26C37.2294 12.7373 37.1127 12.2707 36.8794 11.86C36.6554 11.44 36.3474 11.1133 35.9554 10.88C35.5634 10.6373 35.1107 10.516 34.5974 10.516C34.1027 10.516 33.6501 10.6373 33.2394 10.88C32.8381 11.1133 32.5161 11.44 32.2734 11.86C32.0307 12.2707 31.9094 12.7373 31.9094 13.26ZM51.7496 0.519999H55.9356V19H51.7496V0.519999ZM67.0938 7.17C67.8965 7.17 68.6805 7.33333 69.4458 7.66C70.2111 7.98667 70.8411 8.50467 71.3358 9.214C71.8305 9.914 72.0778 10.838 72.0778 11.986V19H67.8078V12.686C67.8078 11.8647 67.6118 11.2487 67.2198 10.838C66.8278 10.418 66.3145 10.208 65.6798 10.208C65.2598 10.208 64.8631 10.32 64.4898 10.544C64.1258 10.7587 63.8271 11.0667 63.5938 11.468C63.3698 11.86 63.2578 12.3127 63.2578 12.826V19H59.0018V7.506H63.2578V9.2C63.3698 8.892 63.6031 8.584 63.9578 8.276C64.3218 7.95867 64.7745 7.69733 65.3158 7.492C65.8665 7.27733 66.4591 7.17 67.0938 7.17Z" fill="#E1D9C3" />
              </svg>

            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    sx={{
                      '& label': {
                        color: '#E1D9C3', // Color of the label in all states
                      },
                      '& label.Mui-focused': {
                        color: '#E1D9C3', // Color of the label when the input is focused
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#E1D9C3', // Default border color
                        },
                        '&:hover fieldset': {
                          borderColor: '#E1D9C3', // Border color when hovered
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E1D9C3', // Border color when focused
                        },
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#E1D9C3', // Underline color when input is focused for non-outlined input
                      },
                      '& .MuiInput-underline:before': {
                        borderBottomColor: '#E1D9C3', // Underline color before input is focused for non-outlined input
                      },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: '#E1D9C3', // Underline color on hover for non-outlined input
                      },
                      '& .MuiOutlinedInput-input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #386351 inset', // Change #386351 to match your desired background color
                        WebkitTextFillColor: '#E1D9C3', // Ensures the text color remains consistent
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #386351 inset', // Consistent background color when focused
                      }
                    }}
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
                    sx={{
                      '& label': {
                        color: '#E1D9C3', // Color of the label in all states
                      },
                      '& label.Mui-focused': {
                        color: '#E1D9C3', // Color of the label when the input is focused
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#E1D9C3', // Default border color
                        },
                        '&:hover fieldset': {
                          borderColor: '#E1D9C3', // Border color when hovered
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E1D9C3', // Border color when focused
                        },
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#E1D9C3', // Underline color when input is focused for non-outlined input
                      },
                      '& .MuiInput-underline:before': {
                        borderBottomColor: '#E1D9C3', // Underline color before input is focused for non-outlined input
                      },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: '#E1D9C3', // Underline color on hover for non-outlined input
                      },
                      '& .MuiOutlinedInput-input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #386351 inset', // Change #386351 to match your desired background color
                        WebkitTextFillColor: '#E1D9C3', // Ensures the text color remains consistent
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #386351 inset', // Consistent background color when focused
                      }
                    }}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton sx={{ color: "#E1D9C3" }}
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
              </Grid>
              <FormControlLabel sx={{ mt: 2, color: "#E1D9C3" }}
                control={
                  <Checkbox
                    value="remember"
                    sx={{
                      color: "#E1D9C3", // Default color
                      '&.Mui-checked': {
                        color: "#E1D9C3", // Color when checked
                      }
                    }}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#E1D9C3",
                  color: '#386351',
                  '&:hover': {
                    backgroundColor: '#386351', // Change background color on hover
                    color: '#E1D9C3' // Optional: change text color on hover
                  },
                  '&:active': {
                    backgroundColor: '#386351', // Change background color on click
                    color: '#E1D9C3' // Optional: change text color on click
                  }
                }}
              >
                Sign In
              </Button>
              <Grid container sx={{ color: "#E1D9C3" }}>
                <Grid item xs>
                  <Link href="#">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{
            mt: 8, mb: 4, color: '#1D1D21',
            '&:hover': {
              color: '#E1D9C3' // Optional: change text color on hover
            },
            '&:active': {
              color: '#E1D9C3' // Optional: change text color on click
            }
          }} />
        </Container>
      </ThemeProvider>
    </div >
  );
}