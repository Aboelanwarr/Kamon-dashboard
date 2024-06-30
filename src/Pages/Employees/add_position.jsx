import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Container, Box, Typography, TextField, FormControl, Button , Select, MenuItem, InputLabel} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddPostion() {
  const onSubmit = e => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
      "position_name": e.target['position_name'].value,
      "employeeRole": e.target['role'].value,
      "jop_description": e.target['jop_description'].value
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow"
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/add-position`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success" && result.data) {
        console.log("Response Status:", result.status === "success");
        toast.success("Position Added Successfully");
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
        <AddBusinessIcon fontSize='inherit' /> Add Position
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ margin: '20px 0' }}>
          <Typography variant="h5" color="initial">Position Details</Typography>
          <Typography variant="h6" color="initial" sx={{mt:2}}>Position Name</Typography>
          <FormControl fullWidth margin="normal">
            <TextField name='position_name' label="Position_name" variant="outlined" required />
          </FormControl>
          <Typography variant="h6" color="initial" sx={{mb:1}}>Employee Role</Typography>
          <FormControl fullWidth sx={{ mb: "20px" }}>
          <InputLabel id="role-select-label">Select Role</InputLabel>
          <Select
            labelId='role-select-label'
            id='role-select'
            label="Select Role"
            fullWidth
            name='role'
            required
          >
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="operation manager">Operation Manager</MenuItem>
            <MenuItem value="section manager">Section Manager</MenuItem>
            <MenuItem value="cashier">Cashier</MenuItem>
            <MenuItem value="delivery">Delivery</MenuItem>
            <MenuItem value="no role">No Role</MenuItem>
          </Select>
          </FormControl>
          <Typography variant="h6" color="initial" sx={{mb:1}}>Jop Description</Typography>
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