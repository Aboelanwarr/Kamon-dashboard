import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Container,Typography} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import './active_employee_list.css';

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
  const [employeeList, setEmployeeList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/employeeData`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setEmployeeList(result.data);
        } else {
          console.error("Failed to fetch employee list:", result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container className="container" fixed>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Employee List
      </Typography>
      <TableContainer component={Paper} className="table-container">
        <Table className="table" aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Employee First Name</StyledTableCell>
              <StyledTableCell>Employee Last Name</StyledTableCell>
              <StyledTableCell>Employee SSN</StyledTableCell>
              <StyledTableCell>Employee Status</StyledTableCell>
              <StyledTableCell>Employee Gender</StyledTableCell>
              <StyledTableCell>Employee Date Hired</StyledTableCell>
              <StyledTableCell>Employee Position</StyledTableCell>
              <StyledTableCell>Employee Role</StyledTableCell>
              <StyledTableCell>Employee Section</StyledTableCell>
              <StyledTableCell>Employee Branch</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList.map((row) => (
              <StyledTableRow key={row.fn_employee_id} className="styled-table-row">
                <StyledTableCell className="styled-table-cell-body">{row.fn_employee_id}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_employee_first_name}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_employee_last_name}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_employee_ssn}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_employee_status}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_employee_gender}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_employee_date_hired}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_position_name}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_role}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_section_name}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">{row.fn_branch_id}</StyledTableCell>
                <StyledTableCell className="styled-table-cell-body">
                  <Button onClick={() => navigate('/employeeUpdateForm', { state: { employeeId: row.fn_employee_id } })}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_103_484)">
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


