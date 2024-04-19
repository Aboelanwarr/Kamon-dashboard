import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapContainerStyle = {
  width: '80%',
  height: '50vh',
};
const center = {
  lat: 30.005493,
  lng: 31.477898,
}
export default function AddBranch() {

  const [employeeList, setEmployeeList] = useState([]);
  const [mark, setMark] = React.useState({
    lat: 30.005493,
    lng: 31.477898,
  })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch("http://localhost:4000/admin/employees/active-employees-list", requestOptions)
      .then((response) => response.json())
      .then((result) => setEmployeeList(result))
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = JSON.stringify({
      branchName: e.target['branchName'].value,
      branchAddress: e.target['branchAddress'].value,
      branchLocation: `${mark.lng},${mark.lat}`,
      coverage:e.target['coverage'].value,
      branchPhone: e.target['branchPhone'].value,
      manager_id:e.target['manager_id'].value
      })
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body:data,
      redirect: "follow",
      
    };

    fetch("http://localhost:4000/admin/branch/add-new", requestOptions)
      .then((response) => response.json())
      .then((result) => toast.success(result.message))
      .catch((error) => toast.error(error.message));
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add New Branch
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="initial">Branch Details</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='branchName' label="BranchName" variant="outlined" required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='branchAddress' label="BranchAddress" variant="outlined" required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='branchPhone' label="BranchPhone" variant="outlined" required />
          </FormControl>
          <InputLabel id="demo-simple-select-label">Select Manager</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Employee Id"
            fullWidth
            name='manager_id'
          >
            {
              employeeList?.map(employee => (
                <MenuItem key={employee.employee_id} value={employee.employee_id}>{employee.employee_name}</MenuItem>
              ))
            }
          </Select>
        </Box>
        {isLoaded &&
          <Box>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
              options={{}}
              onClick={(e) => {
                setMark({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng()
                })
              }}
            >
              <Marker position={mark}
              />
            </GoogleMap>
            <FormControl fullWidth margin="normal">
              <TextField value={mark.lat} name='lat' label="Latitude" variant="outlined" required />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField value={mark.lng} name='lng' label="Longitude" variant="outlined" required />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField name='coverage' label="Coverage" variant="outlined" required />
            </FormControl>
          </Box>}
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}