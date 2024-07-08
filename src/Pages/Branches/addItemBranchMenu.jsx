import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddItemBranchMenu() {
  const [branchList, setBranchList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`, {      
      method: "GET",
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setBranchList(result.data);
        }else{
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, [token]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/general-menu-list`, {
      method: "GET",
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setItemList(result.data);
        }else{
          console.error("Failed to fetch Item list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      branchId: e.target['branchId'].value,
      itemId: e.target['itemId'].value,
      itemPrice: e.target['itemPrice'].value,
      itemStatus:e.target['itemStatus'].value,
      itemDiscount:e.target['itemDiscount'].value    
    })
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/addItemBranchMenu`, {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log("Response Status:", response.status);
        return response.json();
      })
      .then((result) => {
        if (result.status === "success") {
          toast.success(result.message);
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
        <AddBusinessIcon fontSize='inherit' /> Add Item Branch Menu
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial">Item Details</Typography>
          <Typography variant="h6" color="initial" sx={{mt:2,mb:1}}>Select Branch</Typography>
          <FormControl fullWidth sx={{ mb: "20px" }}>
        <InputLabel id="branch-select-label">Branch</InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          name='branchId'
          label="Branch"
        >
          {branchList.map((branch) => (
            <MenuItem key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</MenuItem>
          ))}
        </Select>
        </FormControl>
        <Typography variant="h6" color="initial" sx={{mb:1}}>Select Item</Typography>
        <FormControl fullWidth sx={{ mb: "20px" }}>
        <InputLabel id="Item-select-label">Select Item</InputLabel>
        <Select
          labelId="Item-select-label"
          id="Item-select"
          name='itemId'
          label="Select Item"
        >
          {itemList.map((item) => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
        </FormControl>
        <Typography variant="h6" color="initial" sx={{mb:1}}>Item Price</Typography>
        <FormControl fullWidth sx={{ mb: "20px" }}>
        <TextField
          id="itemPrice"
          name="itemPrice"
          label="Item Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        </FormControl>
        <Typography variant="h6" color="initial">Item Status</Typography>
        <FormControl fullWidth sx={{ mb: "20px" }}>
            <InputLabel id="itemStatus-select-label">Item Status</InputLabel>
            <Select
              labelId="itemStatus-select-label"
              id="itemStatus-select"
              label="Item Status"
              fullWidth
              name='itemStatus'
              required
            >
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='inactive'>Inactive</MenuItem>
              <MenuItem value='not enough ingredients'>Not Enough Ingredients</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" color="initial" sx={{mb:1}}>Item Discount</Typography>
          <FormControl fullWidth sx={{ mb: "20px" }}>
        <TextField
          id="itemDiscount"
          name="itemDiscount"
          label="Item Discount"
          type="number"
          InputLabelProps={{
            shrink: true,
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