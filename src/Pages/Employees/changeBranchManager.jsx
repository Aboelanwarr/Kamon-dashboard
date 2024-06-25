import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './managerChange.css';

const ChangeBranchManager = () => {
  const [branchId, setBranchId] = useState('');
  const [newManagerId, setNewManagerId] = useState('');
  const [positionChanger, setPositionChanger] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/branch/changeBranchManager`, {
        branchId,
        newManagerId,
        positionChanger,
      });
      if (response.data.status === 'success') {
        toast.success('Branch Manager updated successfully');
      } else {
        toast.error(response.data.message || 'Unexpected error occurred');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Error updating Branch Manager');
    }
  };

  return (
    <div className="manager-change-container">
      <ToastContainer />
      <h1>Change Branch Manager</h1>
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
            value={positionChanger}
            onChange={(e) => setPositionChanger(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Branch Manager</button>
      </form>
    </div>
  );
};

export default ChangeBranchManager;
