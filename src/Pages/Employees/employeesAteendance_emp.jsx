import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DatePicker from '../../components/DatePicker';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D5D5D5',
    color: theme.palette.common.black,
    fontWeight: '600',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: '10px solid #F9F9F9',
    fontWeight: '500',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function EmployeesAteendanceEmp() {
  const [employeeAttendanceList, setEmployeeAttendanceList] = useState([]);
  const handleDateChange = (newDate, dateType) => {
    console.log(`Selected Date for ${dateType}:`, newDate);
    if (dateType === 'fromDate') {
      setFromDate(newDate);
    } else if (dateType === 'toDate') {
      setToDate(newDate);
    }
  };
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const token = localStorage.getItem('token');
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  useEffect(() => {
    // Fetch branches list
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/active-employees-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setEmployeeList(result.data);
          if (result.data.length > 0) {
            setSelectedEmployeeId(result.data[0].id); 
          }
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch(error => console.error(error));
  }, []);


  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/employeesAttendance/${selectedEmployeeId}?fromDate=${fromDate}&toDate=${toDate}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setEmployeeAttendanceList(result.data.attendance);
        } else {
          console.error("Failed to fetch employee list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, [selectedEmployeeId, fromDate, toDate]);
  const handleBranchChange = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Employee Attendance List
      </Typography>
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <InputLabel id="employee-select-label">Employee</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
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
      <InputLabel id="demo-simple-select-label">From Date</InputLabel>
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <DatePicker onChange={(newDate) => handleDateChange(newDate, 'fromDate')} />
      </FormControl>
      <InputLabel id="demo-simple-select-label">To Date</InputLabel>
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <DatePicker onChange={(newDate) => handleDateChange(newDate, 'toDate')} />
      </FormControl>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Schedule ID</StyledTableCell>
              <StyledTableCell >Shift Date IN	</StyledTableCell>
              <StyledTableCell >Shift Date Out	</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeAttendanceList.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell > {index + 1}	</StyledTableCell>
                <StyledTableCell > {row.employee}	</StyledTableCell>
                <StyledTableCell > {row.schedule_id}	</StyledTableCell>
                <StyledTableCell > {row.employee_id}	</StyledTableCell>
                <StyledTableCell >{row.date_in}	</StyledTableCell>
                <StyledTableCell >{row.date_out}	</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


