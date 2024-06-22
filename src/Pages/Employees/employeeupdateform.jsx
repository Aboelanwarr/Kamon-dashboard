import React, { useState } from 'react';
import axios from 'axios';
import './employeeupdateform.css'; // Import your stylesheet here

const EmployeeUpdateForm = () => {
  const [employeeId, setEmployeeId] = useState('');
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (changePhoneNumber) {
        await axios.patch('http://localhost:4000/admin/employees/update-employee-phone', {
          employeeId,
          oldPhone: oldPhoneNumber,
          newPhone: newPhoneNumber,
        });
      }

      if (changeSalary) {
        await axios.patch('http://localhost:4000/admin/employees/change-salary', {
          employeeId,
          changerId,
          newSalary,
          changeReason,
        });
      }

      if (changePosition) {
        await axios.patch('http://localhost:4000/admin/employees/change-position', {
          employee_id: employeeId,
          position_changer_id: positionChangerId,
          new_position: newPosition,
          position_change_type: positionChangeType,
        });
      }

      if (newAddress) {
        await axios.patch('http://localhost:4000/admin/employees/update-employee-address', {
          employeeId,
          newAddress,
        });
      }

      if (changeSalary && changePosition) {
        await axios.patch('http://localhost:4000/admin/employees/updateEmployeeSalaryPosition', {
          employeeId,
          changerId,
          newSalary,
          newPosition,
          positionChangeType,
          changeReason,
        });
      }
      
      // Reset the form
      setEmployeeId('');
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
      
    } catch (err) {
      setError('An error occurred while updating the employee. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="employee-form-container">
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
                value={changerId}
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
                value={positionChangerId}
                onChange={(e) => setPositionChangerId(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Position"
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
              />
              <input
                type="text"
                placeholder="Position Change Type"
                value={positionChangeType}
                onChange={(e) => setPositionChangeType(e.target.value)}
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
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EmployeeUpdateForm;
