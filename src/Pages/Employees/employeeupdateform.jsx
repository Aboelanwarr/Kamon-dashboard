import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './employeeupdateform.css'; // Import your stylesheet here
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDataContext } from '../../authentication/userDataProvide';

const EmployeeUpdateForm = () => {
  const { userData } = useContext(UserDataContext);
  const location = useLocation();
  const [employeeId, setEmployeeId] = useState(location.state?.employeeId || '');
  const [changePhoneNumber, setChangePhoneNumber] = useState(false);
  const [oldPhoneNumber, setOldPhoneNumber] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [changeSalary, setChangeSalary] = useState(false);
  const [changerId, setChangerId] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [changeReason, setChangeReason] = useState('');
  const [changePosition, setChangePosition] = useState(false);
  const [positionChangerId, setPositionChangerId] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [positionChangeType, setPositionChangeType] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [error, setError] = useState('');
  const [employeeStatus, setEmployeeStatus] = useState('');
  const [changeStatus, setChangeStatus] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePassowrd, setChangePassowrd] = useState(false);

  useEffect(() => {
    if (location.state?.employeeId) {
      setEmployeeId(location.state.employeeId);
    }
  }, [location.state]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (changePhoneNumber) {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/update-employee-phone`, {
          employeeId,
          oldPhone: oldPhoneNumber,
          newPhone: newPhoneNumber,
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
    }

      if (changeSalary) {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/change-salary`, {
          employeeId,
          changerId,
          newSalary,
          changeReason,
        })
          .then((result) => {
            if (result.data.status === 'success') {
              toast.success("Salary updated successfully");
            } else {
              toast.error("Failed to update salary");
            }
          })
          .catch((error) => {
            toast.error(error.response?.data?.message || error.message);
          });
      }

      if (changePosition) {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/change-position`, {
          employee_id: employeeId,
          position_changer_id: positionChangerId,
          new_position: newPosition,
          position_change_type: positionChangeType,
        })
          .then((result) => {
            if (result.data.status === 'success') {
              toast.success("Position updated successfully");
            } else {
              toast.error("Failed to update position");
            }
          })
          .catch((error) => {
            toast.error(error.response?.data?.message || error.message);
          });
      }

      if (newAddress) {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/update-employee-address`, {
          employeeId,
          newAddress,
        })
          .then((result) => {
            if (result.data.status === 'success') {
              toast.success("Address updated successfully");
            } else {
              toast.error("Failed to update address");
            }
          })
          .catch((error) => {
            toast.error(error.response?.data?.message || error.message);
          });
      }

      if (changeStatus) {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/employees/employeeStatusChange`, {
          employeeId,
          employeeStatus,
        })
        .then((result) => {
          if (result.data.status === 'success') {
            toast.success("Employee status updated successfully");
            } else {
              toast.error("Failed to update employee status");
            }
          })
        .catch((error) => {
          toast.error(error.response?.data?.message || error.message);
        });
      }

      // Inside handleUpdate function
      if (newPassword) {
        await axios.patch(`${process.env.REACT_APP_SERVER_URL}/admin/employees/changeEmployeePass`, {
          employeeId,
          oldPass: oldPassword,
          newPass: newPassword,
        })
          .then((result) => {
            toast.success("Password updated successfully");
          })
          .catch((error) => {
            toast.error(error.response?.data?.message || error.message);
          });
      }


      // Reset the form
      setChangePhoneNumber(false);
      setOldPhoneNumber('');
      setNewPhoneNumber('');
      setChangeSalary(false);
      setChangerId('');
      setNewSalary('');
      setChangeReason('');
      setChangePosition(false);
      setPositionChangerId('');
      setNewPosition('');
      setPositionChangeType('');
      setNewAddress('');
      setChangeStatus(false);
      setEmployeeStatus('');
      setOldPassword('');
      setNewPassword('');

    } catch (err) {
      toast.error('An error occurred while updating the employee. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="employee-form-container">
      <ToastContainer />
      <form onSubmit={handleUpdate}>
        <h1>Employee Update Form</h1>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>Employee ID</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="checkbox"
            checked={changePhoneNumber}
            onChange={(e) => setChangePhoneNumber(e.target.checked)}
          />
          <label>Change Phone Number</label>
          {changePhoneNumber && (
            <div>
              <input
                type="text"
                placeholder="Old Phone Number"
                value={oldPhoneNumber}
                onChange={(e) => setOldPhoneNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Phone Number"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            checked={changeSalary}
            onChange={(e) => setChangeSalary(e.target.checked)}
          />
          <label>Change Salary</label>
          {changeSalary && (
            <div>
              <input
                type="text"
                placeholder="Changer ID"
                value={userData.employee_id}
                onChange={(e) => setChangerId(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Salary"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
              />
              <input
                type="text"
                placeholder="Change Reason"
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            checked={changePosition}
            onChange={(e) => setChangePosition(e.target.checked)}
          />
          <label>Change Position</label>
          {changePosition && (
            <div>
              <input
                type="text"
                placeholder="Position Changer ID"
                value={userData.employee_id}
                onChange={(e) => setPositionChangerId(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Position"
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
              />
              <select
                value={positionChangeType}
                onChange={(e) => setPositionChangeType(e.target.value)}
              >
                <option value="">Select Change Type</option>
                <option value="promote">Promote</option>
                <option value="demote">Demote</option>
              </select>
            </div>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            checked={changePassowrd}
            onChange={(e) => setChangePassowrd(e.target.checked)}
          />
          <label>Change Account Password</label>
          {changePassowrd && (
            <div>
              <input
                type="text"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <label>Change Address</label>
          <input
            type="text"
            placeholder="New Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            checked={changeStatus}
            onChange={(e) => setChangeStatus(e.target.checked)}
          />
          <label>Change Status</label>
          {changeStatus && (
            <div>
              <select
                value={employeeStatus}
                onChange={(e) => setEmployeeStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          )}
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EmployeeUpdateForm;
