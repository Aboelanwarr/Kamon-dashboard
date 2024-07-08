import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddIngredient() {
  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const token = localStorage.getItem("token");
    const data = JSON.stringify({
      name: e.target['name'].value,
      recipeUnit: e.target['recipeUnit'].value,
      shipmentUnit: e.target['shipmentUnit'].value
    })
    console.log(data); 
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/add-ingredient`, {
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
      if (result.status === "success" && result.data) {
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
        <AddBusinessIcon fontSize='inherit' /> Add Ingredient
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial" sx={{mb:3}}>Ingredient Details</Typography>
          <Typography variant="h6" color="initial">Ingredient Name</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='name' label="IngredientName" variant="outlined" required />
          </FormControl>
          <Typography variant="h6" color="initial">Recipe Unit</Typography>
          <FormControl fullWidth margin="normal" sx={{mt:1}}>
          <InputLabel id="demo-simple-select-label">Select Recipe Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Recipe Unit"
            fullWidth
            name='recipeUnit'
            >
            <MenuItem value="kilogram">Kilo Gram</MenuItem>
            <MenuItem value="gram">Gram</MenuItem>
            <MenuItem value="milliliter">Milli Liter</MenuItem>
            <MenuItem value="liter">Liter</MenuItem>
            <MenuItem value="piece">Piece</MenuItem>
          </Select>
          </FormControl>
          <Typography variant="h6" color="initial">Shipment Unit</Typography>
          <FormControl fullWidth margin="normal" sx={{mt:1}}>
          <InputLabel id="demo-simple-select-label">Select Shipment Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Shipment Unit"
            fullWidth
            name='shipmentUnit'
          >
            <MenuItem value="kilogram">Kilo Gram</MenuItem>
            <MenuItem value="gram">Gram</MenuItem>
            <MenuItem value="milliliter">Milli Liter</MenuItem>
            <MenuItem value="liter">Liter</MenuItem>
            <MenuItem value="piece">Piece</MenuItem>
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