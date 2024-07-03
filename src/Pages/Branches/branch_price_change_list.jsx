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

export default function BranchPriceChangeList() {
  const [branchPriceChangeList, setBranchPriceChangeList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branch-price-changes-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setBranchPriceChangeList(result.data);
        }else{
          console.error("Failed to fetch branch price change list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Branch Price Change List
      </Typography>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Branch</StyledTableCell>
              <StyledTableCell>Changed By</StyledTableCell>
              <StyledTableCell>Change Type</StyledTableCell>
              <StyledTableCell>New Value</StyledTableCell>
              <StyledTableCell>Previous Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branchPriceChangeList.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell > {row.id}	</StyledTableCell>
                <StyledTableCell > {row.item}	</StyledTableCell>
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


