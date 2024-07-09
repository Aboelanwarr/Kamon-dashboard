import React, { useContext, useState } from 'react';
import axios from 'axios';
import './changeItemPrice.css'; // Import your stylesheet here
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { UserDataContext } from '../../authentication/userDataProvide';

const ItemPriceUpdateForm = () => {
  const location = useLocation();
  const { userData } = useContext(UserDataContext);
  const { itemId, branchId: initialBranchId } = location.state || {};
  const [branchId, setBranchId] = useState(initialBranchId || '');
  const [changer, setChanger] = useState('');
  const [changeType, setChangeType] = useState('');
  const [newValue, setNewValue] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/change-item-price`, {
        itemId,
        branchId,
        changer,
        changeType,
        newValue,
      })
      .then((result) => {
        if (result.data.status === 'success') {
          toast.success("Phone number updated successfully");
        } else {
          toast.error("Failed to update phone number");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });

      // Reset the form
      setBranchId('');
      setChanger('');
      setChangeType('');
      setNewValue('');
      
    } catch (err) {
      toast.error('An error occurred while updating the item price. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="item-form-container">
      <ToastContainer />
      <form onSubmit={handleUpdate}>
        <h1>Item Price Update Form</h1>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Item ID</label>
          <input
            type="text"
            value={itemId}
            readOnly
          />
        </div>
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
          <label>Changer ID</label>
          <input
            type="text"
            value={userData.employee_id}
            readOnly
            required
          />
        </div>
        <div>
          <label>Change Type</label>
          <select
            value={changeType}
            onChange={(e) => setChangeType(e.target.value)}
            required
          >
            <option value="">Select Change Type</option>
            <option value="discount">Discount</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div>
          <label>New Value</label>
          <input
            type="number" 
            value={newValue}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              if (changeType === 'discount' && value > 99) {
                toast.error('Discount cannot be greater than 99.');
                return;
              }
              setNewValue(value);
            }}
            required
          />
        </div>
        <button type="submit">Update Item Price</button>
      </form>
    </div>
  );
};

export default ItemPriceUpdateForm;
