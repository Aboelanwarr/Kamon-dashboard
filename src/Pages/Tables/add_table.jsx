import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, Select, MenuItem,InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddTable() {
  const [branchList, setBranchList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}:4000/admin/branch/branches-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setBranchList(result.data);
        }else{
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      branchId: e.target['branch_id'].value,
      capacity: e.target['capacity'].value,
      status: e.target['status'].value,
    })
    console.log("Sending data:", data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}:4000/admin/table/add-newTable`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success(result.message);
      })
      .catch((error) => {
        toast.error(error.message);
      }
      );
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add New Table
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="initial">Select Branch</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Branch Id"
            fullWidth
            name='branch_id'
          >
            {
              branchList?.map(branch => (
                <MenuItem key={branch["branch_id"]} value={branch["branch_id"]}>{branch["branch_name"]}</MenuItem>
              ))
            }
          </Select>
          <FormControl fullWidth margin="normal">
            <TextField name='capacity' label="Capacity" variant="outlined" required />
          </FormControl>
          <InputLabel id="demo-simple-select-label">Select status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Branch Id"
            fullWidth
            name='status'
          >
            <MenuItem value="available">available</MenuItem>
            <MenuItem value="booked">booked</MenuItem>
          </Select>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}

export default AddTable;


