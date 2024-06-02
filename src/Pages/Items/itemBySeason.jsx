import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography,Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ItemBySeason() {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/items/recipe`, requestOptions)
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
  const [seasonList, setSeasonList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/items/recipe`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setSeasonList(result.data);
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
      itemId: e.target['itemId'].value,
      seasonId: e.target['seasonId'].value,
    })
    console.log("Sending data:", data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/items/itemBySeason`, requestOptions)
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
        <AddBusinessIcon fontSize='inherit' /> Add New Item By Season
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial">Select Item</Typography>
        <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-ItemDayType-label">Select Item Day Type</InputLabel>
        <Select
            labelId="demo-simple-select-ItemDayType-label"
            id="demo-simple-select"
            label="Select Item Day Type"
            fullWidth
            name='item_day_type'
            >
            {
              itemList?.map(item => (
                <MenuItem key={item["item_id"]} value={item["item_id"]}>{item["item_name"]}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Typography variant="h5" color="initial">Select Season</Typography>
        <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-season-label">Select Season</InputLabel>
          <Select
            labelId="demo-simple-select-season-label"
            id="demo-simple-select"
            label="Select Season"
            fullWidth
            name='seasonId'
          >
            {
              seasonList?.map(season => (
                <MenuItem key={season["season_id"]} value={season["season_id"]}>{season["season_name"]}</MenuItem>
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



