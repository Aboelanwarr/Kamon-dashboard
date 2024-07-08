import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container,FormControl,InputLabel,MenuItem,Select,Typography} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function BranchPerformance() {
  const [branchList,setBranchList] = useState([]);
  const [branchOverview, setBranchOverview] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [selecteddays, setSelecteddays] = useState('');
  const token = localStorage.getItem('token');
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
          if (result.data.branches && result.data.branches.length > 0) { // Added check for result.data.branches
            setSelectedBranchId(result.data.branches[0].id);
          }
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch(error => console.error(error));
  }, [token]);

  useEffect(() => {
    if (!selectedBranchId) return; 
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branchPerformance/${selectedBranchId}/${selecteddays}`, {
      method: "GET",
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setBranchOverview(result.data);
          if (result.data.length === 0) {
            toast.info("No data found");
          }
        } else {
          console.error("Failed to fetch branch Performance:", result);
        }
      })
      .catch(error => console.error(error));
  }, [selectedBranchId,selecteddays,token]); // Depend on selectedBranchId

  const handleBranchChange = (event) => {
    setSelectedBranchId(event.target.value);
  };
  const handleDaysChange = (event) => {
    setSelecteddays(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Branch Performance
      </Typography>
      <Typography variant="h5" color="initial" sx={{mb:2}}>Select branch</Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
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
      <Typography variant="h5" color="initial" sx={{mb:2}}>Select Days</Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
          <InputLabel id="Days-select-label">Days</InputLabel>
          <Select
            labelId="Days-select-label"
            id="Days-select"
            value={selecteddays}
            label="Days"
            onChange={handleDaysChange}
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map((number) => (
              <MenuItem key={number} value={number}>{number}</MenuItem>
            ))}
          </Select>
        </FormControl>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Branch</StyledTableCell>
            <StyledTableCell>Sales Date</StyledTableCell> 
            <StyledTableCell>Total Sales</StyledTableCell> 
            <StyledTableCell>Total Items Ordered</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {branchOverview.map((row,index) => (
            <StyledTableRow key={index + 1}>
              <StyledTableCell > {index + 1}	</StyledTableCell>
              <StyledTableCell > {row.branch}	</StyledTableCell>
              <StyledTableCell > {row.sales_date}	</StyledTableCell>
              <StyledTableCell > {row.total_sales}	</StyledTableCell>
              <StyledTableCell > {row.total_orders}	</StyledTableCell> 
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}


