import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddPostion() {
  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const data = JSON.stringify({
      "position_name": e.target['position_name'].value,
      "jop_description": e.target['jop_description'].value
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    
    fetch("http://localhost:4000/admin/employees/add-position", requestOptions)
      .then((response) => response.json())
      .then((result) => toast.success(result))
      .catch((error) => toast.error(error));
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial">
        <AddBusinessIcon fontSize='inherit' /> Add Position
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h6" color="initial">Position Details</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='position_name' label="Position_name" variant="outlined" required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField name='jop_description' label="Jop_description" variant="outlined" required />
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}