import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

export default function CustomizedTables() {
  const [sectionList,setSectionList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/sectionsList`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.status === "success"){
          setSectionList(result.data.sections);
        }else{
          console.error("Failed to fetch Section list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  
  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Section List
      </Typography>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Section ID</StyledTableCell>
            <StyledTableCell>Section Name</StyledTableCell>
            <StyledTableCell >Section Description	</StyledTableCell>         
          </TableRow>
        </TableHead>
        <TableBody>
          {sectionList.map((row) => (
            <StyledTableRow key={row.section_id}>
              <StyledTableCell > {row.section_id}	</StyledTableCell>
              <StyledTableCell > {row.section_name}	</StyledTableCell>
              <StyledTableCell > {row.section_description}	</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}


