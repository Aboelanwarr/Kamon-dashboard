import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, Select, MenuItem, InputLabel, Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function EmployeePhone() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
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
      employeeId: selectedEmployeeId,
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
        <FormControl fullWidth sx={{ mb: "20px" }}>
            <Autocomplete sx={{ mt: 1 }}
              options={employeeList}
              getOptionLabel={(option) => option.employee_name}
              renderInput={(params) => (
                <TextField {...params} label="Employee" variant="outlined" size="small" />
              )}
              value={employeeList.find(employee => employee.employee_id === selectedEmployeeId) || null} // Ensure the selected value is displayed
              onChange={(event, newValue) => {
                setSelectedEmployeeId(newValue ? newValue.employee_id : '');
              }}
            />
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


