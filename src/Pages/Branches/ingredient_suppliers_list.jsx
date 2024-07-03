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
import { Container, Typography } from '@mui/material';
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

export default function IngredientSuppliersList() {
  const [ingredientSupplierList, setIngredientSupplierList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/ingredients`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setIngredientSupplierList(result.data);
        }else{
          console.error("Failed to fetch ingredient list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Ingredient Suppliers List
      </Typography>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ingredient ID</StyledTableCell>
              <StyledTableCell>Ingredient Name</StyledTableCell>
              <StyledTableCell>Recipe Ingredients Unit</StyledTableCell>
              <StyledTableCell>Shipment Ingredients Unit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredientSupplierList.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell > {row.ingredient_id}	</StyledTableCell>
                <StyledTableCell > {row.ingredients_name}	</StyledTableCell>
                <StyledTableCell > {row.recipe_ingredients_unit}	</StyledTableCell>
                <StyledTableCell > {row.shipment_ingredients_unit}	</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


