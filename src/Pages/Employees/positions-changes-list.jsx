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



export default function PositionList() {
  const [positionChangeList,setPositionChangeList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}:4000/admin/employees/positions-changes-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success"){
          setPositionChangeList(result.data);
        }else{
          console.error("Failed to fetch position list:", result);
        }
      })
      .catch((error) => console.error(error));
    }, []);

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Position Change History List
      </Typography>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee ID</StyledTableCell>
            <StyledTableCell>Employee Name</StyledTableCell> 
            <StyledTableCell>Position Changer</StyledTableCell> 
            <StyledTableCell>Previous Position</StyledTableCell> 
            <StyledTableCell>New Position</StyledTableCell> 
            <StyledTableCell>Change Type</StyledTableCell> 
            <StyledTableCell>Change Date</StyledTableCell> 
            <StyledTableCell>Actions</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {positionChangeList.map((row) => (
            <StyledTableRow key={row.employee_id}>
              <StyledTableCell > {row.employee_id}	</StyledTableCell>
              <StyledTableCell > {row.employee_name}	</StyledTableCell>
              <StyledTableCell > {row.position_changer}	</StyledTableCell>
              <StyledTableCell > {row.previous_position}	</StyledTableCell>
              <StyledTableCell > {row.new_position}	</StyledTableCell>
              <StyledTableCell > {row.change_type}	</StyledTableCell>
              <StyledTableCell > {row.change_date}	</StyledTableCell>
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


