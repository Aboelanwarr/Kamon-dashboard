import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography,FormControl, Button, Select, MenuItem, InputLabel, Autocomplete, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import DatePicker from '../../components/DatePicker';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
export default function AddEmployeeSchedule() {
  const [employeeList, setEmployeeList] = useState([]);
  const [shiftStartTime, setShiftStartTime] = useState('');
  const [shiftEndTime, setShiftEndTime] = useState('');
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
  const handleDateChange = (newDate, dateType) => {
    console.log(`Selected Date for ${dateType}:`, newDate);
    if (dateType === 'shiftStartTime') {
      setShiftStartTime(newDate);
    } else if (dateType === 'shiftEndTime') {
      setShiftEndTime(newDate);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const data = JSON.stringify({
      "employeeId": selectedEmployeeId,
      "shiftStartTime": shiftStartTime,
      "shiftEndTime": shiftEndTime,
    });
  
    console.log("Submitting data:", data);
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/employee-schedule`, requestOptions)
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
        <AddBusinessIcon fontSize='inherit' /> Add Employee Schedule
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial" sx={{mb:2}}>Schedule Details</Typography>
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
          <Typography variant="h6" color="initial"sx={{mt:1}}>Shift Start Time</Typography>
          <FormControl fullWidth margin="normal">
            <DatePicker onChange={(newDate) => handleDateChange(newDate, 'shiftStartTime')} />
          </FormControl>
          <Typography variant="h6" color="initial"sx={{mt:1}}>Shift End Time</Typography>
          <FormControl fullWidth margin="normal">
            <DatePicker onChange={(newDate) => handleDateChange(newDate, 'shiftEndTime')} />
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}