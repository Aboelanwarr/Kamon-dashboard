import React, { useState } from 'react';
import BranchesCompare from './Branches/BranchesCompare';

const AnotherScreen = () => {
  const [days, setDays] = useState(0);

  const handleDaysChange = (newDays) => {
    setDays(newDays);
  };

  return (
    <div>
      <h1>Another Screen</h1>
      <input
        type="number"
        value={days}
        onChange={(e) => handleDaysChange(e.target.value)}
        placeholder="Enter number of days"
      />
      <BranchesCompare defaultRangeDays={days} />
    </div>
  );
};

export default AnotherScreen;
