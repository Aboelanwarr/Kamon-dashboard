import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from '../components/DatePicker';

export default function AddEmployee() {
  const [positionList, setPositionList] = useState([]);
  const [BranchList, setBranchList] = useState([]);
  const [dateHired, setDateHired] = useState('');
  const [birthDate, setBirthDate] = useState('');
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/positions-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setPositionList(result.data);
        } else {
          console.error("Failed to fetch position list:", result);
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
          console.error("Failed to fetch position list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  const handleDateChange = (newDate, dateType) => {
    console.log(`Selected Date for ${dateType}:`, newDate);
    if (dateType === 'dateHired') {
      setDateHired(newDate);
    } else if (dateType === 'birthDate') {
      setBirthDate(newDate);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    // Safely accessing the value of SSN
    const ssnInput = e.target['ssn'];
    if (!ssnInput) {
      toast.error("SSN input is missing.");
      return;
    }
    const ssn = ssnInput.value;

    // Check if SSN is exactly 14 digits
    if (ssn.length !== 14 || isNaN(ssn)) {
      toast.error("SSN must be exactly 14 digits.");
      return; // Prevent form submission
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      "ssn": e.target['ssn'].value,
      "firstName": e.target['firstName'].value,
      "lastName": e.target['lastName'].value,
      "gender": e.target['gender'].value,
      "salary": e.target['salary'].value,
      "status": e.target['status'].value,
      "position_id": e.target['position_id'].value,
      "branch_id": e.target['branch_id'].value,
      "address": e.target['address'].value,
      "dateHired": dateHired,
      "birthDate": birthDate
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/auth/register`, requestOptions)
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
        <AddBusinessIcon fontSize='inherit' /> Add New Employee
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="initial">Employee Details</Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              name='ssn'
              label="ID Number"
              variant="outlined"
              required
              helperText="SSN must be 14 digits."
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='firstName' label="First Name" variant="outlined" required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='lastName' label="Last Name" variant="outlined" required />
          </FormControl>
          <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Employee Id"
            fullWidth
            name='gender'
          >
            <MenuItem value="m">Male</MenuItem>
            <MenuItem value="f">Female</MenuItem>
          </Select>
          <FormControl fullWidth margin="normal">
            <TextField name='salary' label="Salary" variant="outlined" required />
          </FormControl>
          <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Employee Id"
            fullWidth
            name='status'
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label">Select Position</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Employee Id"
            fullWidth
            name='position_id'
          >
            {
              positionList?.map(position => (
                <MenuItem key={position.position_id} value={position.position_id}>{position.position}</MenuItem>
              ))
            }
          </Select>
          <InputLabel id="demo-simple-select-label">Select Branch</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Employee Id"
            fullWidth
            name='branch_id'
          >
            {
              BranchList?.map(branch => (
                <MenuItem key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</MenuItem>
              ))
            }
          </Select>
          <FormControl fullWidth margin="normal">
            <TextField name='address' label="Address" variant="outlined" />
          </FormControl>
          <InputLabel id="demo-simple-select-label">Date Hired</InputLabel>
          <FormControl fullWidth margin="normal">
            <DatePicker onChange={(newDate) => handleDateChange(newDate, 'dateHired')} />
          </FormControl>
          <InputLabel id="demo-simple-select-label">Birth Date</InputLabel>
          <FormControl fullWidth margin="normal">
            <DatePicker onChange={(newDate) => handleDateChange(newDate, 'birthDate')} />
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}