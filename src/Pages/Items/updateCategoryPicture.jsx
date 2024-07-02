import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './categoryupdateform.css'; // Import your stylesheet here
import { useLocation } from 'react-router-dom';

const CategoryUpdateForm = () => {
  const location = useLocation();
  const [categoryId, setCategoryId] = useState(location.state?.categoryId || '');
  const [categoryImg, setCategoryImg] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setCategoryImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!categoryImg) {
      toast.error('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('categoryId', categoryId);
    formData.append('categoryImg', categoryImg);

    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/menu/changeCategoryPicture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        if (result.data.status === 'success') {
          toast.success('Category picture updated successfully');
        } else {
          toast.error('Failed to update category picture');
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });

      // Reset the form
      setCategoryId('');
      setCategoryImg(null);
    } catch (err) {
      toast.error('An error occurred while updating the category picture. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="category-update-form-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Update Category Picture</h1>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Category ID</label>
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category Image</label>
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

export default CategoryUpdateForm;
