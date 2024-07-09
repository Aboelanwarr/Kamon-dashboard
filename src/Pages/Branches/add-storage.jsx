import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button,Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddBranch() {
  const [managerList, setManagerList] = useState([]);
  const [selectedManagerId, setSelectedManagerId] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/manager-employees-list`, {
      method: "GET",
      redirect: "follow",  
      headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setManagerList(result.data);
        }else{
          console.error("Failed to fetch Manager list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    
    const data = JSON.stringify({
      storageName: e.target['storageName'].value,
      storageAddress: e.target['storageAddress'].value,
      manager_id: selectedManagerId,
      })
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/add-storage`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: data,
      redirect: "follow"
    })
    .then((response) => response.json())
    .then((result) => {
      if(result.status === "success"){
        toast.success(result.message);
      }else{
        toast.error(result.message);
      }
    })
    .catch((error) => {
      toast.error(error.message);
    }
    );
};   

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add Branch Storage
      </Typography>
      <form onSubmit={onSubmit}>
            <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="initial">Storage Details</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='storageName' label="StorageName" variant="outlined" required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='storageAddress' label="StorageAddress" variant="outlined" required />
          </FormControl>
          <Typography variant="h6" color="initial" sx={{mt:2}}>Branch Manager</Typography>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <Autocomplete sx={{ mt: 1 }}
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