import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, FormControl, Select, MenuItem, InputLabel, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import './employeeTransferFilter.css';

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

const EmployeeTransferFilter = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [transferMadeBy, setTransferMadeBy] = useState('');
  const [oldBranchId, setOldBranchId] = useState('');
  const [newBranchId, setNewBranchId] = useState('');
  const [employees, setEmployees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [transferRecords, setTransferRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/employees/active-employees-list`);
        setEmployees(employeeResponse.data.data);

        const branchResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`);
        setBranches(branchResponse.data.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = async () => {
    const params = {
      employeeId: employeeId || undefined,
      transferMadeBy: transferMadeBy || undefined,
      oldBranchId: oldBranchId || undefined,
      newBranchId: newBranchId || undefined,
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/employees/EmployeeTransfer`, { params });
      if (response.data.status === 'success') {
        setTransferRecords(response.data.data);
      } else {
        console.error("Failed to fetch transfer records:", response.data.message);
      }
    } catch (err) {
      console.error("Error fetching transfer records:", err.response?.data?.message || err.message);
    }
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        Employee Transfer Filter
      </Typography>
      <div className="form-row">
        <FormControl className="input-field">
          <InputLabel id="employee-label">Employee</InputLabel>
          <Select
            labelId="employee-label"
            id="employee-id"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {employees.map(employee => (
              <MenuItem key={employee.employee_id} value={employee.employee_id}>
                {employee.employee_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="input-field">
          <TextField
            id="transfer-made-by"
            label="Transfer Made By"
            value={transferMadeBy}
            onChange={(e) => setTransferMadeBy(e.target.value)}
          />
        </FormControl>
      </div>
      <div className="form-row">
        <FormControl className="input-field">
          <InputLabel id="old-branch-label">Old Branch</InputLabel>
          <Select
            labelId="old-branch-label"
            id="old-branch-id"
            value={oldBranchId}
            onChange={(e) => setOldBranchId(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {branches.map(branch => (
              <MenuItem key={branch.branch_id} value={branch.branch_id}>
                {branch.branch_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="input-field">
          <InputLabel id="new-branch-label">New Branch</InputLabel>
          <Select
            labelId="new-branch-label"
            id="new-branch-id"
            value={newBranchId}
            onChange={(e) => setNewBranchId(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {branches.map(branch => (
              <MenuItem key={branch.branch_id} value={branch.branch_id}>
                {branch.branch_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button variant="contained" onClick={handleFilter} sx={{ mt: "20px" }}>Filter</Button>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto', mt: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transfer ID</StyledTableCell>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Transfer Made By</StyledTableCell>
              <StyledTableCell>Old Branch ID</StyledTableCell>
              <StyledTableCell>New Branch ID</StyledTableCell>
              <StyledTableCell>Transfer Date</StyledTableCell>
              <StyledTableCell>Transfer Reason</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transferRecords.map((record) => (
              <StyledTableRow key={record.transfer_id}>
                <StyledTableCell>{record.transfer_id}</StyledTableCell>
                <StyledTableCell>{record.employee_id}</StyledTableCell>
                <StyledTableCell>{record.transfer_made_by}</StyledTableCell>
                <StyledTableCell>{record.old_branch_id}</StyledTableCell>
                <StyledTableCell>{record.new_branch_id}</StyledTableCell>
                <StyledTableCell>{record.transfer_date}</StyledTableCell>
                <StyledTableCell>{record.transfer_reason}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeTransferFilter;
