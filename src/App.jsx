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
import Home from './Pages/home';
import AddBranchSection from './Pages/Branches/add-branch-section';
import AddPosition from './Pages/Employees/add_position';
import AddGeneralSection from './Pages/Branches/add-general-section';
import AddMenuItem from './Pages/Branches/add-menu-item';
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
import Recipe from './Pages/Items/recipe';
import Season from './Pages/Items/season';
import Loading from './components/Loading';
import AddCategory from './Pages/Items/addCategory';
import AddEmployeePhone from './Pages/Employees/employees_phones';
import AddEmployeeSchedule from './Pages/Employees/add_employee-schedule';
import AddEmployeeVecation from './Pages/Employees/add_employee_vecation';
import EmployeesAteendanceEmp from './Pages/Employees/employeesAteendance_emp';
import EmployeesPhonesList from './Pages/Employees/employees_phones_list';
import PositionChangesList from './Pages/Employees/positionChanges';
import EmployeesSchedulePage from './Pages/Employees/employees_schedule';
import EmployeeUpdateForm from './Pages/Employees/employeeupdateform';
import SeasonList from './Pages/Items/seasonList';
import SectionsList from './Pages/Items/sectionsList';
import ChangeItemPrice from './Pages/Items/changeItemPrice';
import EmployeeTransfer from './Pages/Employees/employeeTransfer';
import AddItemBranchMenu from './Pages/Branches/addItemBranchMenu';
import SectionOverView from './Pages/Branches/sectionOverView';
import BranchPerformance from './Pages/Branches/branchPerformance';
import OverAllPerformance from './Pages/Branches/overAllPerformance';
import BranchesCompare from './Pages/Branches/branchesCompare';
import ChangeSectionManager from './Pages/Branches/changeSectionManager';
import ChangeBranchManager from './Pages/Employees/changeBranchManager';
import BookingList from './Pages/Branches/bookingList';
import BranchMenuFilter from './Pages/Branches/branchMenuFilter';
import EmployeeTransferFilter from './Pages/Employees/employeeTransferFilter';
import EmployeeUserProfile from './Pages/employeeUserProfile';
import CategoryUpdateForm from './Pages/Items/updateCategoryPicture';
import ItemUpdateForm from './Pages/Items/updateMenuItemPicture';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
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
          <Route path="employeesBranchSchedule" element={<EmployeesSchedule />} />
          <Route path="itemPriceChange" element={<ListItemPriceChange />} />
          <Route path="tablesList" element={<TablesList />} />
          <Route path="menuList" element={<MenuList />} />
          <Route path="menuListByTime" element={<MenuListByTime />} />
          <Route path="itemBySeason" element={<ItemBySeason />} />
          <Route path="itemByTime" element={<ItemByTime />} />
          <Route path="itemPriceChanges" element={<ItemPriceChanges />} />
          <Route path="recipe" element={<Recipe />} />
          <Route path="season" element={<Season />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="addEmployeePhone" element={<AddEmployeePhone />} />
          <Route path="addEmployeeSchedule" element={<AddEmployeeSchedule />} />
          <Route path="addEmployeeVecation" element={<AddEmployeeVecation />} />
          <Route path="employeesAteendanceEmp" element={<EmployeesAteendanceEmp />} />
          <Route path="employeesPhonesList" element={<EmployeesPhonesList />} />
          <Route path="positionChangesList" element={<PositionChangesList />} />
          <Route path="employeesSchedule" element={<EmployeesSchedulePage />} />
          <Route path="employeeUpdateForm" element={<EmployeeUpdateForm />} />
          <Route path="seasonList" element={<SeasonList />} />
          <Route path="sectionsList" element={<SectionsList />} />
          <Route path="changeItemPrice" element={<ChangeItemPrice />} />
          <Route path="employeeTransfer" element={<EmployeeTransfer />} />
          <Route path="addItemBranchMenu" element={<AddItemBranchMenu />} />
          <Route path="sectionOverView" element={<SectionOverView />} />
          <Route path="branchPerformance" element={<BranchPerformance />} />
          <Route path="overAllPerformance" element={<OverAllPerformance />} />
          <Route path="branchesCompare" element={<BranchesCompare />} />
          <Route path="changeSectionManager" element={<ChangeSectionManager />} />
          <Route path="changeBranchManager" element={<ChangeBranchManager />} />
          <Route path="bookingList" element={<BookingList />} />
          <Route path="branchMenuFilter" element={<BranchMenuFilter />} />
          <Route path="employeeTransferFilter" element={<EmployeeTransferFilter />} />
          <Route path="employeeUserProfile" element={<EmployeeUserProfile />} />
          <Route path="updateCategoryPicture" element={<CategoryUpdateForm />} />
          <Route path="updateMenuItemPicture" element={<ItemUpdateForm />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}

export default App;

