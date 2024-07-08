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


export default function CustomizedTables() {
  const [branchList, setBranchList] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {

    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`, {
      method: "GET",
      redirect: "follow",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setBranchList(result.data);
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Branch List
      </Typography>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>branch ID</StyledTableCell>
              <StyledTableCell>branch name</StyledTableCell>
              <StyledTableCell >branch address	</StyledTableCell>
              <StyledTableCell >manager name	</StyledTableCell>
              <StyledTableCell >branch contact information	</StyledTableCell>
              <StyledTableCell >branch tables	</StyledTableCell>
              <StyledTableCell >branch tables capacity	</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branchList.map((row) => (
              <StyledTableRow key={row.branch_id}>
                <StyledTableCell > {row.branch_id}	</StyledTableCell>
                <StyledTableCell >{row.branch_name}	</StyledTableCell>
                <StyledTableCell >{row.branch_address}	</StyledTableCell>
                <StyledTableCell >{row.manager_name}	</StyledTableCell>
                <StyledTableCell >{row.branch_phone}	</StyledTableCell>
                <StyledTableCell >{row.tables_number}	</StyledTableCell>
                <StyledTableCell >{row.tables_capacity}	</StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

