import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#E1D9C3', // Default text color for buttons
          '&:hover': {
            backgroundColor: '#CDBA96', // Hover background color
          }
        }
      }
    }
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

