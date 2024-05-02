import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StoreIcon from "@mui/icons-material/Store";
import DiamondIcon from "@mui/icons-material/Diamond";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";


export default function NestedList() {
  // Initialize state to manage open/close state of each section individually
  const [openStates, setOpenStates] = React.useState({
    productSetup: false,
    branchSetup: false,
    tableSection: false,
    employeesRolesSetup: false,
    customerSetup: false,
  });

  const handleClick = (section) => {
    setOpenStates((prevStates) => ({
      ...Object.keys(prevStates).reduce((acc, key) => {
        acc[key] = false; // Set all sections to false
        return acc;
      }, {}),
      [section]: !prevStates[section], // Toggle the clicked section
    }));
  };
  return (
    <List
      sx={{ width: "100%", height: "100%", minHeight: "100vh", bgcolor: "#232b2b", color: "white" }}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{
           padding: 0, color: "white", bgcolor: "#232b2b", fontWeight: 400, fontSize: 16,
           lineHeight: 1.5, letterSpacing: "0.00938em", display: "block",height:"59px"}}>
          <ListItemButton sx={{ padding: '10px 16px' }}>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListSubheader>
      }
    >
      <Divider sx={{ bgcolor: "whitesmoke" }} />
      {/* Items Setup */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("productSetup")} >
        <ListItemIcon>
          <DiamondIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Items Setup" />
        {openStates.productSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.productSetup} timeout="auto" unmountOnExit >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/itemBySeason">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Item By Season" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/itemByTime">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Item By Time" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/itemPriceChanges">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Item Price Changes" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/itemPriceRecipes">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Item Price Changes Recipes" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/recipe">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Recipes" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/season">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Season" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: "whitesmoke" }} />
      {/* Employee Setup */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("employeesRolesSetup")}>
        <ListItemIcon>
          <PermIdentityIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Employee Setup" />
        {openStates.employeesRolesSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={openStates.employeesRolesSetup}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddEmployee">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add New Employee" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/register">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add New Employee Account" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addPosition">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Position" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/positionList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Position List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listManagers">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Managers List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListEmployee">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Active Employees" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listInactiveEmployee">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Inactive Employees" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listPositionChange">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Position Change List" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: "whitesmoke" }} />
      {/* Branch Setup */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("branchSetup")}>
        <ListItemIcon>
          <StoreIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Branches Setup" />
        {openStates.branchSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.branchSetup} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddBranch">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add New" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddStorage">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Storage " />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addMenuItem">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Menu Item" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddIngredient">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Ingredient " />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addBranchSection">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Branch Section" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addGeneralSection">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add General Section" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/menuList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Menu List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/menuListByTime">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Menu List By Time" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListBranch">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Branch List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listBranchEmployees">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Branch Employees List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/employeesAttendance">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Employee Attendance List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/employeesSchedule">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Employee Schedule List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/generalMenuList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="General Menu List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/itemPriceChange">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Items Price Change History" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ingredientSuppliersList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Ingredient Suppliers List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listCategories">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Categories List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listRecipes">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Recipes List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/branchPriceChangeList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Branch Price Change List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListSections">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Sections List" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: "whitesmoke" }} />
      {/* Table Section */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("tableSection")}>
        <ListItemIcon>
          <TableRestaurantIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Table Section" />
        {openStates.tableSection ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.tableSection} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddTable">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Table " />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/tablesList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Availability" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider sx={{ bgcolor: "whitesmoke" }} />
       {/* Customer Setup */}
       <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("customerSetup")} >
       <ListItemIcon>
          <PermIdentityIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Customer Setup" />
        {openStates.customerSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.customerSetup} timeout="auto" unmountOnExit >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/customerAddresses">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Customer Addresses" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/customerInformation">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Customer Information" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/customerPhones">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Customer Phones" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/friendRequests">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Friend Requests" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/friendsList">
            <ListItemIcon>
              <FiberManualRecordIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Friends List" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
