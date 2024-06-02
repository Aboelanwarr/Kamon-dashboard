import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMenuItem() {
  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const data = JSON.stringify({
      "itemName": e.target['itemName'].value,
      "itemDesc": e.target['itemDesc'].value,
      "categoryID": e.target['categoryID'].value,
      "prepTime": e.target['prepTime'].value
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/add-menu-item`, requestOptions)
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
        <AddBusinessIcon fontSize='inherit' /> Add Menu Item
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="initial">Menu Item Details</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='itemName' label="Item Name" variant="outlined" required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='itemDesc' label="Item Description" variant="outlined" required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='categoryID' label="Category ID" variant="outlined" required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='prepTime' label="Prepration Time" variant="outlined" required />
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}