import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddIngredient() {
  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      name: e.target['name'].value,
      recipeUnit: e.target['recipeUnit'].value,
      shipmentUnit: e.target['shipmentUnit'].value
    })
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    fetch("http://localhost:4000/admin/branch/add-ingredient", requestOptions)
      .then((response) => response.json())
      .then((result) => toast.success(result.message))
      .catch((error) => toast.error(error.message));
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add Ingredient
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="initial">Ingredient Details</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='name' label="IngredientName" variant="outlined" required />
          </FormControl>
          <InputLabel id="demo-simple-select-label">Select Recipe Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Employee Id"
            fullWidth
            name='recipeUnit'
          >
            <MenuItem value="kilogram">Kilo Gram</MenuItem>
            <MenuItem value="gram">Gram</MenuItem>
            <MenuItem value="milliliter">Milli Liter</MenuItem>
            <MenuItem value="liter">Liter</MenuItem>
            <MenuItem value="piece">Piece</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label">Select Shipment Unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Employee Id"
            fullWidth
            name='shipmentUnit'
          >
            <MenuItem value="kilogram">Kilo Gram</MenuItem>
            <MenuItem value="gram">Gram</MenuItem>
            <MenuItem value="milliliter">Milli Liter</MenuItem>
            <MenuItem value="liter">Liter</MenuItem>
            <MenuItem value="piece">Piece</MenuItem>
          </Select>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}