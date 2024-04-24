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
import { Container,Typography} from '@mui/material';
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

export default function MenuList() {
  const [menuList,setMenuList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}:4000/admin/branch/menu/1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success"){
          setMenuList(result.data.menu);
        }else{
          console.error("Failed to fetch menu list:", result);
        }
      })
      .catch((error) => console.error(error));
    }, []);

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Tables List
      </Typography>
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
            <StyledTableCell>Actions</StyledTableCell> 
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


