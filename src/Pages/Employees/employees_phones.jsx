import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EmployeePhone() {
  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/active-employees-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setEmployeeList(result.data);
        }else{
          console.error("Failed to fetch employees list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    e.preventDefault();
    myHeaders.append("Content-Type", "application/json");
  
    const data = JSON.stringify({
      employeeId: e.target['employee_id'].value,
      employeePhone: e.target['Employee Phone'].value,
    })
    console.log("Sending data:", data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/employee-phone`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          console.log("result", result);
          toast.success("Employee Phone Added Successfully");
        } else {
          toast.error(result.message);
          console.log("result", result);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add Employee Phone
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
        <Typography variant="h6" color="initial" sx={{mb:2}}>Employee Details</Typography>
        <FormControl fullWidth margin="normal">
        <InputLabel id="employee-select-label">Select Employee</InputLabel>
          <Select
            labelId="employee-select-label"
            id="employee-select"
            label="Select Employee"
            fullWidth
            name='employee_id'
          >
            {
              employeeList?.map(employee => (
                <MenuItem key={employee["employee_id"]} value={employee["employee_id"]}>{employee["employee_name"]}</MenuItem>
              ))
            }
          </Select>
          </FormControl>
          <Typography variant="h6" color="initial" sx={{mt:2}}>Employee Phone</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='Employee Phone' label="Employee Phone" variant="outlined" required />
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}

export default EmployeePhone;


