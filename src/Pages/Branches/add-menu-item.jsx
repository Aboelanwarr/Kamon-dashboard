import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState, useRef} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMenuItem() {
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const token = localStorage.getItem("token");
  const handleTimeInput = (e, nextRef) => {
    if (e.target.value.length === 2 && nextRef) {
      nextRef.current.focus();
    }
  };
  const [CategoryList, setCategoryList] = useState([]);
  useEffect(() => {

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/categories-list`, {
      method: "GET",
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setCategoryList(result.data);
        } else {
          console.error("Failed to fetch Manager list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const prepTime = `${e.target['prepHours'].value}:${e.target['prepMinutes'].value}:${e.target['prepSeconds'].value}`;
    const data = JSON.stringify({
      "itemName": e.target['itemName'].value,
      "itemDesc": e.target['itemDesc'].value,
      "categoryID": e.target['categoryID'].value,
      "prepTime": prepTime,
      "picPath": null,
      "vegetarian": e.target['vegetarian'].value,
      "healthy": e.target['healthy'].value
    });
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/add-menu-item`, {
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
        if (result.status === "success") {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add Menu Item
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial" sx={{mb:2}}>Menu Item Details</Typography>
          <Typography variant="h6" color="initial">Time Name</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='itemName' label="Item Name" variant="outlined" required />
          </FormControl>
          <Typography variant="h6" color="initial">Item Description</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='itemDesc' label="Item Description" variant="outlined" required />
          </FormControl>
          <Typography variant="h6" color="initial">Category</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Category"
              fullWidth
              name='categoryID'
            >
              {
                CategoryList?.map(category => (
                  <MenuItem key={category.category_id} value={category.category_id}>{category.category_name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Typography variant="h6" color="initial">Preparation Time</Typography>
          <FormControl fullWidth margin="normal">
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <TextField 
                name='prepHours' 
                label="HH" 
                variant="outlined" 
                required 
                inputProps={{ maxLength: 2 }}
                inputRef={hoursRef}
                onChange={(e) => handleTimeInput(e, minutesRef)}
              />
              <TextField 
                name='prepMinutes' 
                label="MM" 
                variant="outlined" 
                required 
                inputProps={{ maxLength: 2 }}
                inputRef={minutesRef}
                onChange={(e) => handleTimeInput(e, secondsRef)}
              />
              <TextField 
                name='prepSeconds' 
                label="SS" 
                variant="outlined" 
                required 
                inputProps={{ maxLength: 2 }}
                inputRef={secondsRef}
              />
            </Box>
          </FormControl>
          {/* <Typography variant="h6" color="initial">Item Image</Typography>
          <FormControl fullWidth margin="normal">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              name="picPath"
              required
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" sx={{mb:2}}>
                Upload Image
              </Button>
            </label>
            <TextField name='picPath' label="Item Image" variant="outlined" required />
          </FormControl> */}
          <Typography variant="h6" color="initial">Vegetarian</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="vegetarian-select-label">Vegetarian</InputLabel>
            <Select
              labelId="vegetarian-select-label"
              id="vegetarian-select"
              label="Vegetarian"
              fullWidth
              name='vegetarian'
              required
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" color="initial">Healthy</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="healthy-select-label">Healthy</InputLabel>
            <Select
              labelId="healthy-select-label"
              id="healthy-select"
              label="Healthy"
              fullWidth
              name='healthy'
              required
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
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