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

  const handleItemChange = (event) => {
    setSelectedItemId(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Item Price Recipes List
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
              <StyledTableCell>
                  <Button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_103_484)">
                      <path d="M22.0001 4.26667L19.5334 1.8C19.3214 1.59785 19.0397 1.48508 18.7467 1.48508C18.4538 1.48508 18.1721 1.59785 17.9601 1.8L15.7667 4H4.00008C3.64646 4 3.30732 4.14048 3.05727 4.39052C2.80722 4.64057 2.66675 4.97971 2.66675 5.33333V20C2.66675 20.3536 2.80722 20.6928 3.05727 20.9428C3.30732 21.1929 3.64646 21.3333 4.00008 21.3333H18.6667C19.0204 21.3333 19.3595 21.1929 19.6096 20.9428C19.8596 20.6928 20.0001 20.3536 20.0001 20V7.84L22.0001 5.84C22.2085 5.63126 22.3256 5.34832 22.3256 5.05333C22.3256 4.75834 22.2085 4.47541 22.0001 4.26667ZM12.5534 13.42L9.76008 14.04L10.4267 11.2733L16.7934 4.89333L18.9467 7.04667L12.5534 13.42ZM19.6667 6.28667L17.5134 4.13333L18.7467 2.9L20.9001 5.05333L19.6667 6.28667Z" fill="#007EF2" />
                    </g>
                    <defs>
                      <clipPath id="clip0_103_484">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  </Button>

                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}


