import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import { Autocomplete, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

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

export default function MenuList() {
  const [menuList, setMenuList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [selectedDayTime, setSelectedDayTime] = useState('');

  useEffect(() => {
    // Fetch branches list
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setBranchList(result.data);
          // Optionally, set the first branch as selected by default
          if (result.data.length > 0) {
            setSelectedBranchId(result.data[0].id); // Assuming 'id' is the identifier
          }
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/menuByTime/${selectedBranchId}?dayTime=${selectedDayTime}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setMenuList(result.data.menu);
        } else {
          console.error("Failed to fetch menu list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, [selectedBranchId, selectedDayTime]);

  const handleDayTimeChange = (event) => {
    setSelectedDayTime(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Menu List By Snack Time
      </Typography>
      <FormControl fullWidth sx={{ mb: "20px" }}>
            <Autocomplete sx={{ mt: 1 }}
              options={branchList}
              getOptionLabel={(option) => option.branch_name}
              renderInput={(params) => (
                <TextField {...params} label="Branch" variant="outlined" size="small" />
              )}
              value={branchList.find(branch => branch.id === selectedBranchId) || null} // Ensure the selected value is displayed
              onChange={(event, newValue) => {
                setSelectedBranchId(newValue ? newValue.branch_id : '');
              }}
            />
          </FormControl>
        <FormControl fullWidth sx={{ mb: "20px" }}>
        <InputLabel id="daytime-select-label">Day Time</InputLabel>
        <Select
          labelId="daytime-select-label"
          id="daytime-select"
          value={selectedDayTime}
          label="Day Time"
          onChange={handleDayTimeChange}
        >
          <MenuItem value="breakfast">Breakfast</MenuItem>
          <MenuItem value="lunch">Lunch</MenuItem>
          <MenuItem value="dinner">Dinner</MenuItem>
          <MenuItem value="brunch">Snack</MenuItem>
          <MenuItem value="supper">Supper</MenuItem>
          <MenuItem value="midnight snack">Midnight Snack</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item ID</StyledTableCell>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Item Status</StyledTableCell>
              <StyledTableCell>Item Discount</StyledTableCell>
              <StyledTableCell>Item Price</StyledTableCell>
              <StyledTableCell>Preparation Time</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuList.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell > {row.id}	</StyledTableCell>
                <StyledTableCell > {row.item}	</StyledTableCell>
                <StyledTableCell > {row.item_status}	</StyledTableCell>
                <StyledTableCell > {row.item_discount}	</StyledTableCell>
                <StyledTableCell > {row.item_price}	</StyledTableCell>
                <StyledTableCell>
                  {row.preparation_time.minutes ? `${row.preparation_time.minutes} minutes` : `${row.preparation_time.seconds} seconds`}
                </StyledTableCell>
                <StyledTableCell > {row.category}	</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


