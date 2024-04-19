import React, { useEffect, useState } from 'react';
import Navbar from './components/Appbar';
import Sidebar from './components/Sidebar';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import AddProduct from './Pages/AddProduct';
import AddEmployee from './Pages/AddEmployee';
import AddBranch from './Pages/AddBranch';
import AddTable from './Pages/AddTable';
import AddStorage from './Pages/AddStorage';
import ListBranch from './Pages/ListBranch';
import ListEmployee from './Pages/ListEmployee'
import ListProduct from './Pages/ListProduct'
import ListTable from './Pages/ListTable'
import EmployeeRoleSetup from './Pages/EmployeeRoleSetup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIngredient from './Pages/AddIngredient';
import Register from './authenticator/Register';
import Login from './authenticator/Login';
import Home from './Pages/Home';
import AddBranchSection from './Pages/AddBranchSection';
import AddPosition from './Pages/AddPosition';
import AddGeneralSection from './Pages/AddGeneralSection';
import AddMenuItem from './Pages/AddMenuItem';
import ListInActiveEmployee from './Pages/ListInActiveEmployee';
import PositionList from './Pages/PositionList';
import IngredientSuppliersList from './Pages/IngredientSuppliersList';
import ListCategories from './Pages/ListCategories';
import ListRecipes from './Pages/ListRecipes';
import GeneralMenuList from './Pages/GeneralMenuList';
import BranchPriceChangeList from './Pages/BranchPriceChangeList';

function App() {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (token) {
      navigate('/home');
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
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<div className=""><Navbar onLogout={handleLogout} /><div className="grid grid-cols-12">
        <div className="col-span-2"><Sidebar /></div>
        <div className="col-span-10"><Outlet /></div></div></div>}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="addEmployee" element={<AddEmployee />} />
        <Route path="addBranch" element={<AddBranch />} />
        <Route path="addTable" element={<AddTable />} />
        <Route path="addStorage" element={<AddStorage />} />
        <Route path="addIngredient" element={<AddIngredient />} />
        <Route path="listBranch" element={<ListBranch />} />
        <Route path="listEmployee" element={<ListEmployee />} />
        <Route path="listProduct" element={<ListProduct />} />
        <Route path="listTable" element={<ListTable />} />
        <Route path="employeeRoleSetup" element={<EmployeeRoleSetup />} />
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
      </Route>
    </Routes>
    <ToastContainer position="top-center" theme="dark" />
  </div>
);
}

export default App;

