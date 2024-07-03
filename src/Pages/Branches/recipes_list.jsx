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
import { Container,Typography} from '@mui/material';
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

export default function ListRecipes() {
  const [recipeList,setRecipeList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/recipes-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setRecipeList(result.data);
        }else{
          console.error("Failed to fetch recipe list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  
  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Recipes List
      </Typography>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item ID</StyledTableCell>
            <StyledTableCell>Item Name</StyledTableCell> 
            <StyledTableCell>Ingredient Name</StyledTableCell> 
            <StyledTableCell>Ingredient Unit</StyledTableCell> 
            <StyledTableCell>Quantity</StyledTableCell> 
            <StyledTableCell>Recipe Status</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {recipeList.map((row) => (
            <StyledTableRow key={row.item_id}>
              <StyledTableCell > {row.item_id}	</StyledTableCell>
              <StyledTableCell > {row.item_name}	</StyledTableCell>
              <StyledTableCell > {row.ingredient_name}	</StyledTableCell>
              <StyledTableCell > {row.ingredient_unit}	</StyledTableCell>
              <StyledTableCell > {row.quantity}	</StyledTableCell>
              <StyledTableCell > {row.recipe_status}	</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}


