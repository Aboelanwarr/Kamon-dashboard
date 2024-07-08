import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import axios from 'axios';
import './bookingList.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#D5D5D5',
    color: theme.palette.common.black,
    fontWeight: '600',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: '10px solid #F9F9F9',
    fontWeight: '500',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function BookingList() {
  const [bookingList, setBookingList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`, {
      method: "GET",
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setBranchList(result.data);
          // Optionally, set the first branch as selected by default
          if (result.data.length > 0) {
            setSelectedBranchId(result.data[0].branch_id); // Assuming 'branch_id' is the identifier
          }
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch(error => console.error(error));
  }, [token]);

  useEffect(() => {
    if (selectedBranchId) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/bookings/${selectedBranchId}`, {
        method: "GET",
        redirect: "follow",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "success") {
            setBookingList(result.data.bookings);
          } else {
            console.error("Failed to fetch booking list:", result);
            toast.error(result.message || "Failed to fetch booking list");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred while fetching the booking list");
        });
    }
  }, [selectedBranchId, token]);

  const handleBranchChange = (event) => {
    setSelectedBranchId(event.target.value);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/updateBookingStatus`, {
        bookingId,
        bookingStatus: newStatus,
      });
      if (response.data.status === 'success') {
        setBookingList(prevList => 
          prevList.map(booking => 
            booking.booking_id === bookingId ? { ...booking, booking_status: newStatus } : booking
          )
        );
      } else {
        console.error("Failed to update booking status:", response.data.message);
      }
    } catch (err) {
      console.error("Error updating booking status:", err.response?.data?.message || err.message);
    }
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Booking List
      </Typography>
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <InputLabel id="branch-select-label">Branch</InputLabel>
        <Select
          labelId="branch-select-label"
          id="branch-select"
          value={selectedBranchId}
          label="Branch"
          onChange={handleBranchChange}
        >
          {branchList.map((branch) => (
            <MenuItem key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Booking ID</StyledTableCell>
              <StyledTableCell>Customer ID</StyledTableCell>
              <StyledTableCell>Table ID</StyledTableCell>
              <StyledTableCell>Branch ID</StyledTableCell>
              <StyledTableCell>Booking Date</StyledTableCell>
              <StyledTableCell>Booking Start Time</StyledTableCell>
              <StyledTableCell>Booking End Time</StyledTableCell>
              <StyledTableCell>Booking Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingList.map((row) => (
              <StyledTableRow key={row.booking_id}>
                <StyledTableCell>{row.booking_id}</StyledTableCell>
                <StyledTableCell>{row.customer_id}</StyledTableCell>
                <StyledTableCell>{row.table_id}</StyledTableCell>
                <StyledTableCell>{row.branch_id}</StyledTableCell>
                <StyledTableCell>{row.booking_date}</StyledTableCell>
                <StyledTableCell>{row.booking_start_time}</StyledTableCell>
                <StyledTableCell>{row.booking_end_time}</StyledTableCell>
                <StyledTableCell>
                  <FormControl fullWidth>
                    <Select
                      value={row.booking_status}
                      onChange={(e) => handleStatusChange(row.booking_id, e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
