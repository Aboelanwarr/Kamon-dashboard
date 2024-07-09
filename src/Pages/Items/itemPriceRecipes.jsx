import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, Container, FormControl, TextField, Typography } from '@mui/material';
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

export default function ItemPriceRecipes() {
  const [itemPriceList, setItemPriceList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');

  useEffect(() => {
    // Fetch branches list
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/general-menu-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setItemList(result.data);
          // Optionally, set the first branch as selected by default
          if (result.data.length > 0) {
            setSelectedItemId(result.data[0].id); // Assuming 'id' is the identifier
          }
        } else {
          console.error("Failed to fetch item list:", result);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Fetch tables list based on selected branch ID
    if (!selectedItemId) return; // Do not fetch if no branch is selected
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/itemPriceRecipes/${selectedItemId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setItemPriceList(result.data.itemPriceList);
        } else {
          console.error("Failed to fetch item price list:", result);
        }
      })
      .catch(error => console.error(error));
  }, [selectedItemId]); // Depend on selectedItemId


  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Item Price Recipes List
      </Typography>
      <FormControl fullWidth sx={{ mb: "20px" }}>
        <Autocomplete sx={{ mt: 1 }}
          options={itemList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Item" variant="outlined" size="small" />
          )}
          value={itemList.find(item => item.id === selectedItemId) || null} // Ensure the selected value is displayed
          onChange={(event, newValue) => {
            setSelectedItemId(newValue ? newValue.id : '');
          }}
        />
      </FormControl>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item ID</StyledTableCell>
              <StyledTableCell>Item Cost Changed By</StyledTableCell>
              <StyledTableCell>Change Type</StyledTableCell>
              <StyledTableCell>New Value</StyledTableCell>
              <StyledTableCell>Previous Value</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemPriceList.map((row) => (
              <StyledTableRow key={row.item_id}>
                <StyledTableCell > {row.item_id}	</StyledTableCell>
                <StyledTableCell > {row.cost_change_id}	</StyledTableCell>
                <StyledTableCell > {row.branch_id}	</StyledTableCell>
                <StyledTableCell > {row.item_cost_changed_by}	</StyledTableCell>
                <StyledTableCell > {row.change_type}	</StyledTableCell>
                <StyledTableCell > {row.new_value}	</StyledTableCell>
                <StyledTableCell > {row.previous_value}	</StyledTableCell>
                <StyledTableCell>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


