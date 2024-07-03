import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()
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
              <StyledTableCell>Item Picture</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
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
                <StyledTableCell>
                  <img
                    src={`${item.picture_path}`}
                    alt={item.item_name}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                <Button onClick={() => {
                    navigate('/changeItemPrice', { state: { itemId: item.item_id, branchId } });
                  }}
                >
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
                    Change Price
                  </Button>
                  <Button onClick={() => navigate('/updateMenuItemPicture', { state: { itemId: item.item_id} })}
                  >
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
                    Change Picture
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BranchMenuFilter;
