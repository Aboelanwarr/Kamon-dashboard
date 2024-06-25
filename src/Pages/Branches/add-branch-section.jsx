import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddBranchSection() {
  const [BranchList, setBranchList] = useState([]);
  const [sectionsList, setSectionsList] = useState([]);
  const [managerList, setManagerList] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/manager-employees-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setManagerList(result.data);
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
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/sections/1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          const sortedSections = result.data.sections.sort((a, b) => a.id - b.id);
          setSectionsList(sortedSections);
        } else {
          console.error("Failed to fetch sections list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      "branch_id": e.target['branch_id'].value,
      "section_id": e.target['section_id'].value,
      "manager_id": e.target['manager_id'].value,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/add-branch-section`, requestOptions)
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
        <AddBusinessIcon fontSize='inherit' /> Add New Branch Section
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="initial">Branch Section Details</Typography>
          <Typography variant="h5" color="initial" sx={{mt:2}}>Select Branch</Typography>
          <FormControl fullWidth margin='normal'>
          <InputLabel id="demo-simple-selectBranch-label">Select Branch</InputLabel>
          <Select
            labelId="demo-simple-selectBranch-label"
            id="demo-simple-selectBranch"
            label="Select Branch"
            fullWidth
            name='branch_id'
          >
            {
              BranchList?.map(branch => (
                <MenuItem key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</MenuItem>
              ))
            }
          </Select>
          </FormControl>
          <Typography variant="h6" color="initial">Select Section</Typography>
          <FormControl fullWidth margin='normal'>
          <InputLabel id="demo-simple-selectSection-label">Select Section</InputLabel>
          <Select
            labelId="demo-simple-selectSection-label"
            id="demo-simple-selectSection"
            label="Select Section"
            fullWidth
            name='section_id'
          >
            {
              sectionsList?.map(section => (
                <MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>
              ))
            }
          </Select>
          </FormControl>
          <Typography variant="h6" color="initial">Select Manager</Typography>
          <FormControl fullWidth margin='normal'>
          <InputLabel id="demo-simple-selectManager-label">Select Manager</InputLabel>
          <Select
            labelId="demo-simple-selectManager-label"
            id="demo-simple-selectManager"
            label="Select Manager"
            fullWidth
            name='manager_id'
          >
            {
              managerList?.map(manager => (
                <MenuItem key={manager.id} value={manager.id}>{manager.name}</MenuItem>
              ))
            }
          </Select>
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}