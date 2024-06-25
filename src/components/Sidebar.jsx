import * as React from "react";
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
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Link } from "react-router-dom";


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
      sx={{ width: "100%", height: "100%", minHeight: "100vh", bgcolor: "#f1f0f0", color: "#232b2b"}}
    >
      {/* Menu Setup */}
      <ListItemButton sx={{mb: 1 }} onClick={() => handleClick("productSetup")} >
        <ListItemIcon>
          <DiamondIcon sx={{color:'#386351'}} />
        </ListItemIcon>
        <ListItemText primary="Menu Setup" />
        {openStates.productSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.productSetup} timeout="auto" unmountOnExit >
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} component={Link} to="/addItemBranchMenu">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Item Branch Menu" />
          </ListItemButton>
        <ListItemButton sx={{ pl: 4 }} component={Link} to="/menuList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Menu List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/generalMenuList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="General Menu List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/menuListByTime">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Menu List By Time" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/itemBySeason">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Item By Season" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/itemByTime">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Item By Time" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/itemPriceChanges">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Item Price Changes" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/recipe">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Recipes" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/season">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Season" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addMenuItem">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Menu Item" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addCategory">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Category" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listCategories">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Categories List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listRecipes">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Recipes List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddIngredient">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Ingredient" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ingredientSuppliersList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Ingredient List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/sectionsList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Sections List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/seasonList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Season List" />
          </ListItemButton>
        </List>
      </Collapse>
      {/* Employee Setup */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("employeesRolesSetup")}>
        <ListItemIcon>
          <PermIdentityIcon sx={{color:'#386351'}} />
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
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add New Employee" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/employeeTransfer">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Employee Transfer" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addEmployeePhone">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Employee Phone" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/register">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add New Employee Account" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addEmployeeSchedule">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Employee Schedule" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/employeesSchedule">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Employee Schedule" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addEmployeeVecation">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Employee Vecation" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addPosition">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Position" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/positionList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Position List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listManagers">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Managers List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListEmployee">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Active Employees" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listInactiveEmployee">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Inactive Employees" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listPositionChange">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Position Change List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/positionChangesList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Employee Position Change" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/employeesAteendanceEmp">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Employee Attendance" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/employeesPhonesList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Employee Phones" />
          </ListItemButton>
        </List>
      </Collapse>
      {/* Branch Setup */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("branchSetup")}>
        <ListItemIcon>
          <StoreIcon sx={{color:'#386351'}} />
        </ListItemIcon>
        <ListItemText primary="Branches Setup" />
        {openStates.branchSetup ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.branchSetup} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddBranch">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add New" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddStorage">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Storage " />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addBranchSection">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Branch Section" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/addGeneralSection">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add General Section" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListBranch">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Branch List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/branchPerformance">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Branch Performance" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/overAllPerformance">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Over All Performance" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/branchesCompare">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Branches Compare" />
          </ListItemButton>
          
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/listBranchEmployees">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Branch Employees List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/employeesAttendance">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Employee Attendance List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/employeesBranchSchedule">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Employee Schedule List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/itemPriceChange">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Items Price Change History" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/branchPriceChangeList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Branch Price Change List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/ListSections">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Sections List" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/sectionOverView">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Sections OverView" />
          </ListItemButton>
        </List>
      </Collapse>
      {/* Table Section */}
      <ListItemButton sx={{ mt: 1, mb: 1 }} onClick={() => handleClick("tableSection")}>
        <ListItemIcon>
          <TableRestaurantIcon sx={{color:'#386351'}} />
        </ListItemIcon>
        <ListItemText primary="Table Section" />
        {openStates.tableSection ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStates.tableSection} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/AddTable">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Add Table " />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/tablesList">
            <ListItemIcon>
              <FiberManualRecordIcon sx={{color:'#386351'}} />
            </ListItemIcon>
            <ListItemText primary="Availability" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
