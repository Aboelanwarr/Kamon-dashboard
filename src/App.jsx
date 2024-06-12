import React, { useEffect, useState } from 'react';
import Navbar from './components/Appbar';
import Sidebar from './components/Sidebar';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import AddEmployee from './authentication/employee_account';
import AddBranch from './Pages/Branches/add-new';
import AddTable from './Pages/Tables/add_table';
import AddStorage from './Pages/Branches/add-storage';
import ListBranch from './Pages/Branches/branch_list';
import ListEmployee from './Pages/Employees/active_employee_list'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIngredient from './Pages/Branches/add-ingredient';
import Register from './authentication/register';
import Login from './authentication/login';
import Home from './Pages/Home';
import AddBranchSection from './Pages/Branches/add-branch-section';
import AddPosition from './Pages/Employees/add_position';
import AddGeneralSection from './Pages/Branches/add-general-section';
import AddMenuItem from './Pages/Branches/add-menu-item';
import ListInActiveEmployee from './Pages/Employees/inactive_employee_list';
import PositionList from './Pages/Employees/position_list';
import IngredientSuppliersList from './Pages/Branches/ingredient_suppliers_list';
import ListCategories from './Pages/Branches/categories_list';
import ListRecipes from './Pages/Branches/recipes_list';
import GeneralMenuList from './Pages/Branches/general_menu_list';
import BranchPriceChangeList from './Pages/Branches/branch_price_change_list';
import ListManagers from './Pages/Employees/manager_employee_list';
import ListPositionChange from './Pages/Employees/positions-changes-list';
import ListSections from './Pages/Branches/sections';
import ListBranchEmployees from './Pages/Branches/activeEmployees';
import EmployeesAttendance from './Pages/Branches/employeesAttendance';
import EmployeesSchedule from './Pages/Branches/employeesSchedule';
import ListItemPriceChange from './Pages/Branches/itemPriceChanges';
import TablesList from './Pages/Tables/tables';
import MenuList from './Pages/Branches/menu';
import MenuListByTime from './Pages/Branches/menuByTime';
import ItemBySeason from './Pages/Items/itemBySeason';
import ItemByTime from './Pages/Items/itemByTime';
import ItemPriceChanges from './Pages/Items/itemPriceChanges';
import ItemPriceRecipes from './Pages/Items/itemPriceRecipes';
import Recipe from './Pages/Items/recipe';
import Season from './Pages/Items/season';




function App() {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (token) {
      // navigate('/home');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<div className=""><Navbar onLogout={handleLogout} /><div className="grid grid-cols-12">
          <div className="col-span-2"><Sidebar /></div>
          <div className="col-span-10"><Outlet /></div></div></div>}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="addEmployee" element={<AddEmployee />} />
          <Route path="addBranch" element={<AddBranch />} />
          <Route path="addTable" element={<AddTable />} />
          <Route path="addStorage" element={<AddStorage />} />
          <Route path="addIngredient" element={<AddIngredient />} />
          <Route path="listBranch" element={<ListBranch />} />
          <Route path="register" element={<Register />} />
          <Route path="listEmployee" element={<ListEmployee />} />
          <Route path="addBranchSection" element={<AddBranchSection />} />
          <Route path="addPosition" element={<AddPosition />} />
          <Route path="addGeneralSection" element={<AddGeneralSection />} />
          <Route path="addMenuItem" element={<AddMenuItem />} />
          <Route path="listInactiveEmployee" element={<ListInActiveEmployee />} />
          <Route path="positionList" element={<PositionList />} />
          <Route path="ingredientSuppliersList" element={<IngredientSuppliersList />} />
          <Route path="listCategories" element={<ListCategories />} />
          <Route path="listRecipes" element={<ListRecipes />} />
          <Route path="generalMenuList" element={<GeneralMenuList />} />
          <Route path="branchPriceChangeList" element={<BranchPriceChangeList />} />
          <Route path="listManagers" element={<ListManagers />} />
          <Route path="listPositionChange" element={<ListPositionChange />} />
          <Route path="listSections" element={<ListSections />} />
          <Route path="listBranchEmployees" element={<ListBranchEmployees />} />
          <Route path="employeesAttendance" element={<EmployeesAttendance />} />
          <Route path="employeesSchedule" element={<EmployeesSchedule />} />
          <Route path="itemPriceChange" element={<ListItemPriceChange />} />
          <Route path="tablesList" element={<TablesList />} />
          <Route path="menuList" element={<MenuList />} />
          <Route path="menuListByTime" element={<MenuListByTime />} />
          <Route path="itemBySeason" element={<ItemBySeason />} />
          <Route path="itemByTime" element={<ItemByTime />} />
          <Route path="itemPriceChanges" element={<ItemPriceChanges />} />
          <Route path="itemPriceRecipes" element={<ItemPriceRecipes />} />
          <Route path="recipe" element={<Recipe />} />
          <Route path="season" element={<Season />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}

export default App;

