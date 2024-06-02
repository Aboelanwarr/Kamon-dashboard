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
import { Container, Typography } from '@mui/material';
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

export default function IngredientSuppliersList() {
  const [ingredientSupplierList, setIngredientSupplierList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/ingredient-suppliers-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setIngredientSupplierList(result.data);
        }else{
          console.error("Failed to fetch ingredient supplier list:", result);
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
              <StyledTableCell>Ingredient Name</StyledTableCell>
              <StyledTableCell>Supply Company</StyledTableCell>
              <StyledTableCell>Company Type</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredientSupplierList.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell > {row.ingredient_name}	</StyledTableCell>
                <StyledTableCell > {row.supply_company}	</StyledTableCell>
                <StyledTableCell > {row.company_type}	</StyledTableCell>
                <StyledTableCell sx={{ display: "flex", gap: "10px" }}>
                  <Button variant="outlined" startIcon={<EditIcon />}></Button>
                  <Button variant="outlined" startIcon={<DeleteIcon />}></Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}


