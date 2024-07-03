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
import { Container,FormControl,InputLabel,MenuItem,Select,Typography} from '@mui/material';
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

export default function SectionOverview() {
  const [sectionList,setSectionList] = useState([]);
  const [sectionOverview, setSectionOverview] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [selecteddays, setSelecteddays] = useState('');
  useEffect(() => {
    // Fetch Section list
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/sectionsList`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setSectionList(result.data.sections);
          if (result.data.sections.length > 0) {
            setSelectedSectionId(result.data.sections[0].id);
          }
        } else {
          console.error("Failed to fetch branch list:", result);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (!selectedSectionId) return; 
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/sectionOverView/${selectedSectionId}/${selecteddays}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          setSectionOverview(result.data);
        } else {
          console.error("Failed to fetch sectionOverView:", result);
        }
      })
      .catch(error => console.error(error));
  }, [selectedSectionId,selecteddays]); // Depend on selectedBranchId

  const handleSectionChange = (event) => {
    setSelectedSectionId(event.target.value);
  };
  const handleDaysChange = (event) => {
    setSelecteddays(event.target.value);
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        <AddBusinessIcon fontSize='inherit' /> Section OverView
      </Typography>
      <Typography variant="h5" color="initial" sx={{mb:2}}>Select Section</Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
        <InputLabel id="section-select-label">Section</InputLabel>
        <Select
          labelId="section-select-label"
          id="section-select"
          value={selectedSectionId}
          label="Section"
          onChange={handleSectionChange}
        >
          {sectionList.map((section) => (
            <MenuItem key={section.section_id} value={section.section_id}>{section.section_name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h5" color="initial" sx={{mb:2}}>Select Days</Typography>
      <FormControl fullWidth sx={{mb:"20px"}}>
          <InputLabel id="Days-select-label">Days</InputLabel>
          <Select
            labelId="Days-select-label"
            id="Days-select"
            value={selecteddays}
            label="Days"
            onChange={handleDaysChange}
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map((number) => (
              <MenuItem key={number} value={number}>{number}</MenuItem>
            ))}
          </Select>
        </FormControl>
    <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Section ID</StyledTableCell>
            <StyledTableCell>Section Name</StyledTableCell> 
            <StyledTableCell>Total Orders</StyledTableCell> 
            <StyledTableCell>Total Items Ordered</StyledTableCell> 
            <StyledTableCell>Average Section Rating</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {sectionOverview.map((row) => (
            <StyledTableRow key={row.section_id}>
              <StyledTableCell > {row.section_id}	</StyledTableCell>
              <StyledTableCell > {row.section_name}	</StyledTableCell>
              <StyledTableCell > {row.total_orders}	</StyledTableCell>
              <StyledTableCell > {row.total_items_ordered}	</StyledTableCell>
              <StyledTableCell > {parseFloat(row?.average_section_rating).toFixed(2)} </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}


