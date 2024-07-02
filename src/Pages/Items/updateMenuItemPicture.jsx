import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './itemupdateform.css'; // Import your stylesheet here
import { useLocation } from 'react-router-dom';

const ItemUpdateForm = () => {
  const location = useLocation();
  const [itemId, setItemId] = useState(location.state?.itemId || '');
  const [itemImg, setItemImg] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setItemImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!itemImg) {
      toast.error('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('itemId', itemId);
    formData.append('itemImg', itemImg);

    try {
      await axios.patch(`http://localhost:4000/admin/menu/changeItemPicture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        if (result.data.status === 'success') {
          toast.success('Item picture updated successfully');
        } else {
          toast.error('Failed to update item picture');
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });

      // Reset the form
      setItemId('');
      setItemImg(null);
    } catch (err) {
      toast.error('An error occurred while updating the item picture. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="item-update-form-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Update Item Picture</h1>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Item ID</label>
          <input
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Item Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Update Picture</button>
      </form>
    </div>
  );
};

export default ItemUpdateForm;
