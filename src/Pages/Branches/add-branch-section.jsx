import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography,FormControl, Button, Select, MenuItem, InputLabel, Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddBranchSection() {
  const [branchList, setBranchList] = useState([]);
  const [sectionsList, setSectionsList] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [selectedManagerId, setSelectedManagerId] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/manager-employees-list`, {
      method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setManagerList(result.data);
        } else {
          console.error("Failed to fetch position list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, [token]);

  useEffect(() => {

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`, {
      method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setBranchList(result.data);
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, [token]);

  useEffect(() => {

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/sections/1`, {
      method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
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
  }, [token]);

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      "branch_id": selectedBranchId,
      "section_id": selectedSectionId,
      "manager_id": selectedManagerId,
    });

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/add-branch-section`, {
      method: "POST",
      body: data,
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success" && result.data) {
        toast.success("Branch Added Successfully");
      } else {
        toast.error(result.message);
      }
    })
    .catch((error) => {
      toast.error(error.message);
      console.log(error);
    });
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
          <FormControl fullWidth sx={{ mb: "20px" }}>
        <Autocomplete sx={{mt:1}}
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
          <Typography variant="h5" color="initial" sx={{mt:2}}>Select Section</Typography>
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <Autocomplete sx={{mt:1}}
          options={sectionsList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Section" variant="outlined" size="small" />
          )}
          value={sectionsList.find(section => section.id === selectedSectionId) || null} // Ensure the selected value is displayed
          onChange={(event, newValue) => {
            setSelectedSectionId(newValue ? newValue.id : '');
          }}
        />
      </FormControl>
          <Typography variant="h5" color="initial" sx={{mt:2}}>Select Manager</Typography>
          <FormControl fullWidth sx={{ mb: "20px" }}>
        <Autocomplete sx={{mt:1}}
          options={managerList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Manager" variant="outlined" size="small" />
          )}
          value={managerList.find(manager => manager.id === selectedManagerId) || null} // Ensure the selected value is displayed
          onChange={(event, newValue) => {
            setSelectedManagerId(newValue ? newValue.id : '');
          }}
        />
      </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}