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
import { Autocomplete, Container,FormControl,InputLabel,MenuItem,Select,TextField,Typography} from '@mui/material';
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

export default function PositionChangesList() {
  const [positionChangeList,setPositionChangeList] = useState([]);
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
        if (result.status === "success"){
          setEmployeeList(result.data);
          if (result.data.length > 0) {
            setSelectedEmployeeId(result.data[0].employee_id); // Assuming 'id' is the identifier
          }
        } else {
          console.error("Failed to fetch Employee list:", result);
        }
      })
      .catch((error) => console.error(error));
    }, []);
    useEffect(() => {
      if (!selectedEmployeeId) return;
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/positionsChanges/${selectedEmployeeId}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === "success") {
            setPositionChangeList(result.data.attendance);
          } else {
            console.error("Failed to fetch Employees list:", result);
          }
        })
        .catch(error => console.error(error));
    }, [selectedEmployeeId]);
  
  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Employee Position Change
      </Typography>
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
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee ID</StyledTableCell>
            <StyledTableCell>Employee Name</StyledTableCell> 
            <StyledTableCell>Position Changer</StyledTableCell> 
            <StyledTableCell>Previous Position</StyledTableCell> 
            <StyledTableCell>New Position</StyledTableCell> 
            <StyledTableCell>Change Type</StyledTableCell> 
            <StyledTableCell>Change Date</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {positionChangeList.map((row) => (
            <StyledTableRow key={row.employee_id}>
              <StyledTableCell > {row.employee_id}	</StyledTableCell>
              <StyledTableCell > {row.employee_name}	</StyledTableCell>
              <StyledTableCell > {row.position_changer}	</StyledTableCell>
              <StyledTableCell > {row.previous_position}	</StyledTableCell>
              <StyledTableCell > {row.new_position}	</StyledTableCell>
              <StyledTableCell > {row.change_type}	</StyledTableCell>
              <StyledTableCell > {row.change_date}	</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}


