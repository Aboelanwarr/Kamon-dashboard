import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, FormControl, Button, Select, MenuItem, TextField, InputLabel, Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';
import DatePicker from '../../components/DatePicker';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
export default function EmployeeTransfer() {
  const [employeeList, setEmployeeList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [transferDate, setTransferDate] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState('');
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
      "employeeId": selectedEmployeeId,
      "branchId": selectedBranchId,
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
        toast.success("Employee Transfered Successfully");
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
          <Typography variant="h6" color="initial" sx={{ mt: 1, mb: 1 }}>Select Branch</Typography>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <Autocomplete sx={{ mt: 1 }}
              options={branchList}
              getOptionLabel={(option) => option.branch_name}
              renderInput={(params) => (
                <TextField {...params} label="Branch" variant="outlined" size="small" />
              )}
              value={branchList.find(branch => branch.id === selectedBranchId) || null} // Ensure the selected value is displayed
              onChange={(event, newValue) => {
                setSelectedBranchId(newValue ? newValue.branch_id : '');
              }}
            />
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