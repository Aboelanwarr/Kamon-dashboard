import React, {useState } from 'react';
import axios from 'axios';
import './branchesCompare.css';

const BranchesCompare = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [rangeDays, setRangeDays] = useState('');
  const [error, setError] = useState('');

  const fetchBranchComparison = async (days) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/branch/branchesCompare/${days}`);
      const data = response.data;
      if (data.status === "success" && Array.isArray(data.data)) {
        setBranchesData(data.data);
      } else {
        setBranchesData([]);
        setError('Unexpected response format');
      }
    } catch (err) {
      setError('Error fetching branch comparison data');
    }
  };

  const handleFetchData = () => {
    setError('');
    if (rangeDays) {
      fetchBranchComparison(rangeDays);
    } else {
      setError('Please enter a valid number of days');
    }
  };

  return (
    <div className="branch-comparison-container">
      <h1>Branch Comparison</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter number of days"
          value={rangeDays}
          onChange={(e) => setRangeDays(e.target.value)}
        />
        <button onClick={handleFetchData}>Get Data</button>
      </div>
      <div className="branch-comparison-grid">
        {branchesData.map(branch => (
          <div key={branch.branch_id} className="branch-card">
            <h2>{branch.branch_name}</h2>
            <p>Total Sales: ${branch.total_sales}</p>
            <p>Total Orders: {branch.total_orders}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchesCompare;
