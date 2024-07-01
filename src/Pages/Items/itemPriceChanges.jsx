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

export default function ItemPriceChanges() {
  const [itemPriceList,setItemPriceList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/general-menu-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setItemList(result.data);
          if (result.data.length > 0) {
            setSelectedItemId(result.data[0].id);
          }
        } else {
          console.error("Failed to fetch item list:", result);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (!selectedItemId) return;
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/itemPriceChanges/${selectedItemId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setItemPriceList(result.data.priceChanges);
        } else {
          console.error("Failed to fetch item price list:", result);
        }
      })
      .catch(error => console.error(error));
  }, [selectedItemId]);

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
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item ID</StyledTableCell>
            <StyledTableCell>Branch</StyledTableCell> 
            <StyledTableCell>Change by</StyledTableCell> 
            <StyledTableCell>Change Type</StyledTableCell> 
            <StyledTableCell>New Value</StyledTableCell> 
            <StyledTableCell>Previous Value</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {itemPriceList.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell > {row.id}	</StyledTableCell>
              <StyledTableCell > {row.branch}	</StyledTableCell>
              <StyledTableCell > {row.changed_by}	</StyledTableCell>
              <StyledTableCell > {row.change_type}	</StyledTableCell>
              <StyledTableCell > {row.new_value}	</StyledTableCell>
              <StyledTableCell > {row.previous_value}	</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}


