import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={600}
            height={300}
            data={branchesData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="branch_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_sales" fill="#8884d8" name="Total Sales" />
            <Bar dataKey="total_orders" fill="#82ca9d" name="Total Orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BranchesCompare;
