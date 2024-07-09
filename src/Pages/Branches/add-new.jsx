import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';
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
  const [managerList, setManagerList] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState('');
  const [mark, setMark] = React.useState({
    lat: 30.005493,
    lng: 31.477898,
  })
  const token = localStorage.getItem('token');
  const { isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/manager-employees-list`, {
      method: "GET",
      redirect: "follow",
      headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success"){
          setManagerList(result.data);
        }else{
          console.error("Failed to fetch Managers list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const data = JSON.stringify({
      branchName: e.target['branchName'].value,
      branchAddress: e.target['branchAddress'].value,
      branchLocation: `${mark.lng},${mark.lat}`,
      coverage:e.target['coverage'].value,
      branchPhone: e.target['branchPhone'].value,
      manager_id: selectedManagerId,
      })
  
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/add-new`, {
      method: "POST",
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body:data,
      redirect: "follow",
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    })
    .catch((error) => {
      toast.error(error.message);
      console.log(error);
    });
};

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add New Branch
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial">Branch Details</Typography>
          <Typography variant="h6" color="initial" sx={{mt:2}}>Branch Name</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='branchName' label="BranchName" variant="outlined" required />
          </FormControl>
          <Typography variant="h6" color="initial" sx={{mt:2}}>Branch Address</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='branchAddress' label="BranchAddress" variant="outlined" required />
          </FormControl>
          <Typography variant="h6" color="initial" sx={{mt:2}}>Branch Phone</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='branchPhone' label="BranchPhone" variant="outlined" required />
          </FormControl>
          <Typography variant="h6" color="initial" sx={{mt:2}}>Branch Manager</Typography>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <Autocomplete sx={{ mt: 1 }}
              options={managerList}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Manager" variant="outlined" size="small" />
              )}
              value={managerList.find(manager => manager.id === selectedManagerId) || null} // Ensure the selected value is displayed
              onChange={(event, newValue) => {
                setSelectedManagerId(newValue ? newValue.id : '');
              }}
            />
          </FormControl>
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