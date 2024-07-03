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
import { Container,FormControl,InputLabel,MenuItem,Select,Typography} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

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

export default function EmployeesPhonesList() {
  const [phonesList,setPhonesList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

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
          setBranchList(result.data);
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
    // Fetch tables list based on selected branch ID
    if (!selectedEmployeeId) return; // Do not fetch if no branch is selected
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/phones/${selectedEmployeeId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setPhonesList(result.data.phones);
        } else {
          console.error("Failed to fetch tables list:", result);
        }
      })
      .catch(error => console.error(error));
  }, [selectedEmployeeId]); // Depend on selectedBranchId

  const handleBranchChange = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Employees Phones List
      </Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
        <InputLabel id="employee-select-label">Employee</InputLabel>
        <Select
          labelId="employee-select-label"
          id="employee-select"
          value={selectedEmployeeId}
          label="Employee"
          onChange={handleBranchChange}
        >
          {branchList.map((branch) => (
            <MenuItem key={branch.employee_id} value={branch.employee_id}>{branch.employee_name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Phone ID</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {phonesList.map((row) => (
            <StyledTableRow key={row.phone_id}>
              <StyledTableCell > {row.phone_id}	</StyledTableCell>
              <StyledTableCell > {row.phone}	</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}


