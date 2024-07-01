import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SignIn.css';
import loginLogo from '../assets/loginLogo.svg';


function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          // Store token
          localStorage.setItem('token', result.data.token);
  
          // Fetch user data using the token
          fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/tokenData`, {
            method: 'GET',
            headers: {
              Authorization: result.data.token
            }
          })
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('userData', JSON.stringify(data.data));
            navigate('/home');
            toast.success('Login successful');
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
            toast.error('Error fetching user data');
          });
        } else {
          throw new Error('Failed to login');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        toast.error(error.message);
      });
  };
  

  return (
    <div className="login-page-body">
      <div className="login-container">
        <div className="login-box">
          <div className="logo-box">
            <img src={loginLogo} alt="Login Logo" width="210" height="191" />
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" required />
                <button type="button" className="toggle-password" onClick={handlePasswordVisibility}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button type="submit" className="submitButton">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
