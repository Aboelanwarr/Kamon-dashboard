import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, Select, MenuItem, InputLabel, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from '../components/DatePicker';
import './addEmployee.css';

export default function AddEmployee() {
  const [positionList, setPositionList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [dateHired, setDateHired] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sectionList, setSectionList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');

  useEffect(() => {
    fetchPositions();
    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranchId) {
      fetchSections();
    }
  }, [selectedBranchId]);

  const fetchPositions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/positions-list`);
      const result = await response.json();
      if (result.status === 'success') {
        setPositionList(result.data);
      } else {
        console.error('Failed to fetch position list:', result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/sections/${selectedBranchId}`);
      const result = await response.json();
      if (result.status === 'success') {
        setSectionList(result.data.sections);
      } else {
        console.error('Failed to fetch section list:', result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`);
      const result = await response.json();
      if (result.status === "success") {
        setBranchList(result.data);
        if (result.data.length > 0) {
          setSelectedBranchId(result.data[0].id);
        }
      } else {
        console.error("Failed to fetch branch list:", result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (newDate, dateType) => {
    if (dateType === 'dateHired') {
      setDateHired(newDate);
    } else if (dateType === 'birthDate') {
      setBirthDate(newDate);
    }
  };

  const handleBranchChange = (event) => {
    setSelectedBranchId(event.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const ssn = e.target['ssn'].value;
    if (ssn.length !== 14 || isNaN(ssn)) {
      toast.error("SSN must be exactly 14 digits.");
      return;
    }

    const data = {
      ssn: e.target['ssn'].value,
      firstName: e.target['firstName'].value,
      lastName: e.target['lastName'].value,
      gender: e.target['gender'].value,
      salary: e.target['salary'].value,
      position_id: e.target['position_id'].value,
      status: e.target['status'].value,
      branch_id: selectedBranchId,  // Using selectedBranchId
      sectionId: e.target['sectionId'].value,
      address: e.target['address'].value,
      dateHired,
      birthDate,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/admin/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === 'success') {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container fixed sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" color="initial" className="header">
        <AddBusinessIcon fontSize="large" /> Add New Employee
      </Typography>
      <form onSubmit={onSubmit} className="form">
        <Box className="form-section">
          <Typography variant="h6" color="initial" className="section-header">Employee Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <TextField
                  name="ssn"
                  label="ID Number"
                  variant="outlined"
                  required
                  helperText="SSN must be 14 digits."
                  size="small"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <TextField name="firstName" label="First Name" variant="outlined" required size="small" />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <TextField name="lastName" label="Last Name" variant="outlined" required size="small" />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select labelId="gender-label" label="Gender" name="gender" fullWidth size="small">
                  <MenuItem value="m">Male</MenuItem>
                  <MenuItem value="f">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <TextField name="salary" label="Salary" variant="outlined" required size="small" />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select labelId="status-label" name="status" label="Status" fullWidth size="small">
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="position-label">Position</InputLabel>
                <Select labelId="position-label" label="Position" name="position_id" fullWidth size="small">
                  {positionList.map(position => (
                    <MenuItem key={position.position_id} value={position.position_id}>{position.position}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="branch-label">Branch</InputLabel>
                <Select labelId="branch-label" label="Branch" name="branch_id" fullWidth size="small" value={selectedBranchId} onChange={handleBranchChange}>
                  {branchList.map(branch => (
                    <MenuItem key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="section-label">Section</InputLabel>
                <Select labelId="section-label" label="Section" name="sectionId" fullWidth size="small">
                  {sectionList.map(section => (
                    <MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <TextField name="address" label="Address" variant="outlined" size="small" />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <DatePicker onChange={(newDate) => handleDateChange(newDate, 'dateHired')} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <DatePicker onChange={(newDate) => handleDateChange(newDate, 'birthDate')} />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box className="submit-button">
          <Button variant="contained" color="primary" type="submit">
            Add Employee
          </Button>
        </Box>
      </form>
    </Container>
  );
}