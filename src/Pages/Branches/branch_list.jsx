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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {
  const [branchList,setBranchList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}:4000/admin/branch/branches-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setBranchList(result.data);
        }else{
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
            <StyledTableCell >Actions</StyledTableCell>          
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
              <StyledTableCell>
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

