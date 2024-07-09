import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddItemBranchMenu() {
  const [branchList, setBranchList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [itemList, setItemList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
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
        if (result.status === "success") {
          setBranchList(result.data);
        } else {
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
        if (result.status === "success") {
          setItemList(result.data);
        } else {
          console.error("Failed to fetch Item list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  const onSubmit = e => {
    e.preventDefault();

    const data = JSON.stringify({
      branchId: selectedBranchId,
      itemId: selectedItemId,
      itemPrice: e.target['itemPrice'].value,
      itemStatus: e.target['itemStatus'].value,
      itemDiscount: e.target['itemDiscount'].value
    })
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/addItemBranchMenu`, {
      method: "POST",
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
          toast.success("Item added to branch menu successfully");
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
          <Typography variant="h6" color="initial" sx={{ mt: 2, mb: 1 }}>Select Branch</Typography>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <Autocomplete sx={{ mt: 1 }}
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
          <Typography variant="h6" color="initial" sx={{ mb: 1 }}>Select Item</Typography>
          <FormControl fullWidth sx={{ mb: "20px" }}>
            <Autocomplete sx={{ mt: 1 }}
              options={itemList}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Item" variant="outlined" size="small" />
              )}
              value={itemList.find(item => item.id === selectedItemId) || null} // Ensure the selected value is displayed
              onChange={(event, newValue) => {
                setSelectedItemId(newValue ? newValue.id : '');
              }}
            />
          </FormControl>
          <Typography variant="h6" color="initial" sx={{ mb: 1 }}>Item Price</Typography>
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
          <Typography variant="h6" color="initial" sx={{ mb: 1 }}>Item Discount</Typography>
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