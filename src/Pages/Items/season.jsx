import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Season() {
  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      seasonName: e.target['season_name'].value,
      seasonDesc: e.target['season_description'].value
    })
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}:4000/admin/items/season`, requestOptions)
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
        <AddBusinessIcon fontSize='inherit' /> Add Season
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial">Season Name</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='season_name' label="Season Name" variant="outlined" required />
          </FormControl>
          <Typography variant="h5" color="initial">Season Description</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='season_description' label="Season Description" variant="outlined" required />
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          Add
        </Button>
      </form>
    </Container>
  );
}