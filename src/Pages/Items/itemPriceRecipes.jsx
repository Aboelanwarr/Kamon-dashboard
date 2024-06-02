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

export default function ItemPriceRecipes() {
  const [itemPriceList,setItemPriceList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');

  useEffect(() => {
    // Fetch branches list
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/items/item-list`, requestOptions)
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
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/items/item-price-list/${selectedItemId}`, requestOptions)
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

  const handleItemChange = (event) => {
    setSelectedItemId(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Item Price Changes List
      </Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
        <InputLabel id="item-select-label">Item</InputLabel>
        <Select
          labelId="item-select-label"
          id="item-select"
          value={selectedItemId}
          label="Item"
          onChange={handleItemChange}
        >
          {itemList.map((item) => (
            <MenuItem key={item.item_id} value={item.item_id}>{item.item_name}</MenuItem>
          ))}
        </Select>
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


