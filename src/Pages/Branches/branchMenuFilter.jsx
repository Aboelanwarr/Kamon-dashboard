import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, FormControl, Select, MenuItem, InputLabel, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import './branchMenuFilter.css';

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

const BranchMenuFilter = () => {
  const [branchId, setBranchId] = useState('');
  const [seasonId, setSeasonId] = useState('');
  const [itemType, setItemType] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [itemStatus, setItemStatus] = useState('');
  const [vegetarian, setVegetarian] = useState('');
  const [healthy, setHealthy] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [branches, setBranches] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [categories, setCategories] = useState([]);
  const itemTypes = ['breakfast', 'lunch', 'dinner', 'brunch', 'supper', 'midnight snack'];
  const itemStatuses = ['active', 'pending', 'inactive'];
  const booleanOptions = [{ value: '', label: 'None' }, { value: 'true', label: 'True' }, { value: 'false', label: 'False' }];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branches-list`);
        setBranches(branchResponse.data.data);

        const seasonResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/menu/seasonsList`);
        setSeasons(seasonResponse.data.data.seasons);

        const categoryResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/branch/categories-list`);
        setCategories(categoryResponse.data.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = async () => {
    if (!branchId) {
      alert("Branch ID is required");
      return;
    }

    const params = new URLSearchParams();
    params.append('seasonId', seasonId || '');
    params.append('itemType', itemType || '');
    params.append('categoryId', categoryId || '');
    params.append('itemStatus', itemStatus || '');
    params.append('vegetarian', vegetarian || '');
    params.append('healthy', healthy || '');

    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/menu/branchMenuFilter/${branchId}?${params.toString()}`);
      if (response.data.status === 'success') {
        setMenuItems(response.data.data);
      } else {
        console.error("Failed to fetch menu items:", response.data.message);
      }
    } catch (err) {
      console.error("Error fetching menu items:", err.response?.data?.message || err.message);
    }
  };

  return (
    <Container fixed sx={{ mt: "20px" }}>
      <Typography variant="h4" color="initial" sx={{ mb: "20px" }}>
        Branch Menu Filter
      </Typography>
      <div className="form-row">
        <FormControl className="input-field">
          <InputLabel id="branch-label">Branch</InputLabel>
          <Select
            labelId="branch-label"
            id="branch-id"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            required
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {branches.map(branch => (
              <MenuItem key={branch.branch_id} value={branch.branch_id}>
                {branch.branch_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="input-field">
          <InputLabel id="season-label">Season</InputLabel>
          <Select
            labelId="season-label"
            id="season-id"
            value={seasonId}
            onChange={(e) => setSeasonId(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {seasons.map(season => (
              <MenuItem key={season.season_id} value={season.season_id}>
                {season.season_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="form-row">
        <FormControl className="input-field">
          <InputLabel id="item-type-label">Item Type</InputLabel>
          <Select
            labelId="item-type-label"
            id="item-type"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {itemTypes.map(type => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="input-field">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-id"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {categories.map(category => (
              <MenuItem key={category.category_id} value={category.category_id}>
                {category.category_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="form-row">
        <FormControl className="input-field">
          <InputLabel id="item-status-label">Item Status</InputLabel>
          <Select
            labelId="item-status-label"
            id="item-status"
            value={itemStatus}
            onChange={(e) => setItemStatus(e.target.value)}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {itemStatuses.map(status => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="input-field">
          <InputLabel id="vegetarian-label">Vegetarian</InputLabel>
          <Select
            labelId="vegetarian-label"
            id="vegetarian"
            value={vegetarian}
            onChange={(e) => setVegetarian(e.target.value)}
          >
            {booleanOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="form-row">
        <FormControl className="input-field">
          <InputLabel id="healthy-label">Healthy</InputLabel>
          <Select
            labelId="healthy-label"
            id="healthy"
            value={healthy}
            onChange={(e) => setHealthy(e.target.value)}
          >
            {booleanOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button variant="contained" onClick={handleFilter}>Filter</Button>
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto', mt: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item ID</StyledTableCell>
              <StyledTableCell>Item Name</StyledTableCell>
              <StyledTableCell>Category ID</StyledTableCell>
              <StyledTableCell>Item Description</StyledTableCell>
              <StyledTableCell>Preparation Time</StyledTableCell>
              <StyledTableCell>Vegetarian</StyledTableCell>
              <StyledTableCell>Healthy</StyledTableCell>
              <StyledTableCell>Item Status</StyledTableCell>
              <StyledTableCell>Discount</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Average Rating</StyledTableCell>
              <StyledTableCell>Raters Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <StyledTableRow key={item.item_id}>
                <StyledTableCell>{item.item_id}</StyledTableCell>
                <StyledTableCell>{item.item_name}</StyledTableCell>
                <StyledTableCell>{item.category_id}</StyledTableCell>
                <StyledTableCell>{item.item_description}</StyledTableCell>
                <StyledTableCell>{item.preparation_time.minutes} mins</StyledTableCell>
                <StyledTableCell>{item.vegetarian ? 'Yes' : 'No'}</StyledTableCell>
                <StyledTableCell>{item.healthy ? 'Yes' : 'No'}</StyledTableCell>
                <StyledTableCell>{item.item_status}</StyledTableCell>
                <StyledTableCell>{item.discount}</StyledTableCell>
                <StyledTableCell>{item.price}</StyledTableCell>
                <StyledTableCell>{item.average_rating}</StyledTableCell>
                <StyledTableCell>{item.raters_number}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BranchMenuFilter;
