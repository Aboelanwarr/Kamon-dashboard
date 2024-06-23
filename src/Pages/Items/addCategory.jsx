import React, { useState, useEffect } from 'react';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddCategory() {
  const [sectionList, setSectionList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/sectionsList`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setSectionList(result.data.sections);
        } else {
          console.error("Failed to fetch Section list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      sectionId: e.target['sectionId'].value,
      categoryName: e.target['categoryName'].value,
      categoryDescription: e.target['categoryDescription'].value,
    })
    console.log("Sending data:", data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/category`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success(result.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add New Category
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
        <Typography variant="h5" color="initial">Select Section</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-Section-label">Select Section</InputLabel>
            <Select
              labelId="demo-simple-select-Section-label"
              id="demo-simple-select-Section"
              label="Select Section"
              fullWidth
              name='sectionId'
            >
              {
                sectionList?.map(sections => (
                  <MenuItem key={sections["section_id"]} value={sections["section_id"]}>{sections["section_name"]}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Typography variant="h5" color="initial">Category Name</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='categoryName' label="Category Name" variant="outlined" required />
          </FormControl>
          <Typography variant="h5" color="initial">Category Description</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='categoryDescription' label="Category Description" variant="outlined" required />
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}



