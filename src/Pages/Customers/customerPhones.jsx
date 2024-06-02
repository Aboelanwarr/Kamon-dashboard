import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Container,FormControl,InputLabel,MenuItem,Select,Typography} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomerPhones() {
  const [phonesList,setPhonesList] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  useEffect(() => {
    // Fetch branches list
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/customers/customers-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setPhonesList(result.data);
          // Optionally, set the first branch as selected by default
          if (result.data.length > 0) {
            setSelectedCustomerId(result.data[0].id); // Assuming 'id' is the identifier
          }
        } else {
          console.error("Failed to fetch customer list:", result);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch tables list based on selected branch ID
    if (!selectedCustomerId) return; // Do not fetch if no branch is selected
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/customers/customerPhones/${selectedCustomerId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setPhonesList(result.data.attendance);
        } else {
          console.error("Failed to fetch address list:", result);
        }
      })
      .catch(error => console.error(error));
  }, [selectedCustomerId]); // Depend on selectedCustomerId

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Customer Phones
      </Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
        <InputLabel id="customer-select-label">Customer</InputLabel>
        <Select
          labelId="customer-select-label"
          id="customer-select"
          value={selectedCustomerId}
          label="Customer"
          onChange={handleCustomerChange}
        >
          {phonesList.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Phone ID</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {phonesList.map((row) => (
            <StyledTableRow key={row.customer_phone_id}>
              <StyledTableCell > {row.customer_phone_id}	</StyledTableCell>
              <StyledTableCell > {row.customer_phone}	</StyledTableCell>
              <StyledTableCell sx={{display:"flex",gap:"10px"}}>
                <Button variant="outlined" startIcon={<EditIcon />}></Button>
                <Button variant="outlined" startIcon={<DeleteIcon/>}></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}


