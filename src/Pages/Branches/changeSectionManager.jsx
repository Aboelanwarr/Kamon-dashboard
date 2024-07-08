import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sectionManager.css';
import { UserDataContext } from '../../authentication/userDataProvide';

const ChangeSectionManager = () => {
  const { userData } = useContext(UserDataContext);
  const location = useLocation();
  const [branchId, setBranchId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [newManagerId, setNewManagerId] = useState('');
  const [positionChanger, setPositionChanger] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location.state) {
      setBranchId(location.state.branchId || '');
      setSectionId(location.state.sectionId || '');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/changeSectionManager`, {
        branchId,
        sectionId,
        newManagerId,
        positionChanger,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.data.status === 'success') {
        toast.success('Section Manager updated successfully');
      } else {
        toast.error(response.data.message || 'Unexpected error occurred');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Error updating Section Manager');
    }
  };

  return (
    <div className="manager-change-container">
      <ToastContainer />
      <h1>Change Section Manager</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Branch ID</label>
          <input
            type="text"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Section ID</label>
          <input
            type="text"
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Manager ID</label>
          <input
            type="text"
            value={newManagerId}
            onChange={(e) => setNewManagerId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position Changer ID</label>
          <input
            type="text"
            value={userData.employee_id}
            onChange={(e) => setPositionChanger(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Section Manager</button>
      </form>
    </div>
  );
};

export default ChangeSectionManager;
