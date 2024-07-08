import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DatePicker from '../../components/DatePicker';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
export default function CustomizedTables() {
  const [employeeAttendanceList, setEmployeeAttendanceList] = useState([]);
  const handleDateChange = (newDate, dateType) => {
    console.log(`Selected Date for ${dateType}:`, newDate);
    if (dateType === 'fromDate') {
      setFromDate(newDate);
    } else if (dateType === 'toDate') {
      setToDate(newDate);
    }
  };
  const [branchList, setBranchList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`, {
      method: "GET",
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setBranchList(result.data);
          if (result.data.branches && result.data.branches.length > 0) { // Added check for result.data.branches
            setSelectedBranchId(result.data.branches[0].id);
          }
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch(error => console.error(error));
  }, [token]);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/employeesAttendance/${selectedBranchId}?fromDate=${fromDate}&toDate=${toDate}`, {
      method: "GET",
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setEmployeeAttendanceList(result.data.attendance);
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while fetching employee list.");
      });
  }, [selectedBranchId, fromDate, toDate, token]);
  const handleBranchChange = (event) => {
    setSelectedBranchId(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Employee Attendance List
      </Typography>
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <InputLabel id="branch-select-label">Branch</InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          value={selectedBranchId}
          label="Branch"
          onChange={handleBranchChange}
          required
        >
          {branchList.map((branch) => (
            <MenuItem key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <InputLabel id="demo-simple-select-label">From Date</InputLabel>
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <DatePicker onChange={(newDate) => handleDateChange(newDate, 'fromDate')} required />
      </FormControl>
      <InputLabel id="demo-simple-select-label">To Date</InputLabel>
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <DatePicker onChange={(newDate) => handleDateChange(newDate, 'toDate')}required />
      </FormControl>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Employee Name</StyledTableCell>
              <StyledTableCell >Employee shift start time	</StyledTableCell>
              <StyledTableCell >Employee attendance in	</StyledTableCell>
              <StyledTableCell >Employee shift end time	</StyledTableCell>
              <StyledTableCell >Employee attendance out	</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeAttendanceList.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell > {index + 1}	</StyledTableCell>
                <StyledTableCell > {row.employee}	</StyledTableCell>
                <StyledTableCell > {row.shift_start_time}	</StyledTableCell>
                <StyledTableCell >{row.attendance_in}	</StyledTableCell>
                <StyledTableCell >{row.shift_end_time}	</StyledTableCell>
                <StyledTableCell >{row.attendance_out}	</StyledTableCell>
                <StyledTableCell>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


