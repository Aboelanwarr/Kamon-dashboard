import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, FormControl, Button, Select, MenuItem, TextField, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import DatePicker from '../../components/DatePicker';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
export default function EmployeeTransfer() {
  const [employeeList, setEmployeeList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [transferDate, setTransferDate] = useState('');
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/active-employees-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setEmployeeList(result.data);
        } else {
          console.error("Failed to fetch employees list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setBranchList(result.data);
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDateChange = (newDate, dateType) => {
    console.log(`Selected Date for ${dateType}:`, newDate);
    if (dateType === 'transferDate') {
      setTransferDate(newDate);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      "employeeId": e.target['employeeId'].value,
      "branchId": e.target['branchId'].value,
      "transferDate": transferDate,
      "transferReason": e.target['transferReason'].value,
      "transferMadeBy": e.target['transferMadeBy'].value
    });

    console.log("Submitting data:", data);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/employeeTransfer`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success(result.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Employee Transfer
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial" sx={{ mb: 2 }}>Transfer Details</Typography>
          <Typography variant="h6" color="initial" sx={{ mb: 1 }}>Select Employee</Typography>
          <FormControl fullWidth>
          <InputLabel id="employee-select-label">Select Employee</InputLabel>
          <Select
            labelId="employee-select-label"
            id="demo-simple-select"
            label="Select Employee"
            fullWidth
            name='employeeId'
          >
            {
              employeeList?.map(employee => (
                <MenuItem key={employee["employee_id"]} value={employee["employee_id"]}>{employee["employee_name"]}</MenuItem>
              ))
            }
          </Select>
          </FormControl>
          <Typography variant="h6" color="initial" sx={{ mt: 1, mb: 1 }}>Select Branch</Typography>
          <FormControl fullWidth>
            <InputLabel id="branch-select-label">Select Branch</InputLabel>
            <Select
              labelId="branch-select-label"
              id="branch-select"
              label="Select Branch"
              fullWidth
              name='branchId'
            >
              {branchList?.map(branch => (
                <MenuItem key={branch["branch_id"]} value={branch["branch_id"]}>{branch["branch_name"]}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h6" color="initial" sx={{ mt: 1, mb: 1 }}>Transfer Made By</Typography>
          <FormControl fullWidth>
            <TextField name='transferMadeBy' label="Transfer Made By" variant="outlined" required />
          </FormControl>
          <Typography variant="h6" color="initial" sx={{ mt: 1, mb: 1 }}>Transfer Date</Typography>
          <FormControl fullWidth margin="normal">
            <DatePicker onChange={(newDate) => handleDateChange(newDate, 'transferDate')} />
          </FormControl>
          <Typography variant="h6" color="initial" sx={{ mt: 1, mb: 1 }}>Transfer Reason</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='transferReason' label="Transfer Reason" variant="outlined" required />
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}