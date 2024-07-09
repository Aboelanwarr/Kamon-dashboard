import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography,Button,FormControl, Autocomplete, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ItemBySeason() {
  const [itemList, setItemList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [seasonList, setSeasonList] = useState([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState('');
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/general-menu-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setItemList(result.data);
        }else{
          console.error("Failed to fetch item list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/seasonsList`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setSeasonList(result.data.seasons);
        }else{
          console.error("Failed to fetch season list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      itemId: selectedItemId,
      seasonId: selectedSeasonId,
    })
    console.log("Sending data:", data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/itemBySeason`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success" && result.data) {
        toast.success("Item Added Successfully");
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
        <AddBusinessIcon fontSize='inherit' /> Add New Item By Season
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial">Select Item</Typography>
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
        <Typography variant="h5" color="initial">Select Season</Typography>
        <FormControl fullWidth sx={{ mb: "20px" }}>
            <Autocomplete sx={{ mt: 1 }}
              options={seasonList}
              getOptionLabel={(option) => option.season_name}
              renderInput={(params) => (
                <TextField {...params} label="Season" variant="outlined" size="small" />
              )}
              value={seasonList.find(season => season.season_id === selectedSeasonId) || null} // Ensure the selected value is displayed
              onChange={(event, newValue) => {
                setSelectedSeasonId(newValue ? newValue.season_id : '');
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



