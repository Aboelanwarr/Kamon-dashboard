import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography,FormControl, Button, Select, MenuItem, TextField, InputLabel, Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';
import DatePicker from '../../components/DatePicker';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
export default function AddEmployeeVecation() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [vacationStartDate, setVacationStartDate] = useState('');
  const [vacationEndDate, setVacationEndDate] = useState('');
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
    if (dateType === 'vacationStartDate') {
      setVacationStartDate(newDate);
    } else if (dateType === 'vacationEndDate') {
      setVacationEndDate(newDate);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const data = JSON.stringify({
      "employeeId": selectedEmployeeId,
      "vacationStartDate": vacationStartDate,
      "vacationEndDate": vacationEndDate,
      "vacationReason": e.target['vecation_reason'].value
    });
  
    console.log("Submitting data:", data); // Added console.log to view the data being submitted
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/employee-vacation`, requestOptions)
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
        <AddBusinessIcon fontSize='inherit' /> Add Employee Vecation
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial" sx={{mb:2}}>Vecation Details</Typography>
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
          <Typography variant="h6" color="initial"sx={{mt:1}}>Vecation Start Time</Typography>
          <FormControl fullWidth margin="normal">
            <DatePicker onChange={(newDate) => handleDateChange(newDate, 'vacationStartDate')} />
          </FormControl>
          <Typography variant="h6" color="initial"sx={{mt:1}}>Vecation End Time</Typography>
          <FormControl fullWidth margin="normal">
            <DatePicker onChange={(newDate) => handleDateChange(newDate, 'vacationEndDate')} />
          </FormControl>
          <Typography variant="h6" color="initial"sx={{mt:1}}>Vecation Reason</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='vecation_reason' label="Vecation Reason" variant="outlined" required />
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}