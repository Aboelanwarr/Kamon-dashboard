import React from 'react';
import BranchesCompare from './Branches/branchesCompare';
import { useContext } from 'react';
import { UserDataContext } from '../authentication/userDataProvide';
import './Home.css';

const Home = () => {
  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'morning';
    } else if (currentHour < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  };
  const { userData } = useContext(UserDataContext);
  return (
    <div>
      <h1 className="greeting">
        Hello, {userData.employee_first_name}. Good {getTimeOfDay()}!
      </h1>
      <BranchesCompare defaultRangeDays={30} />
    </div>
  );
};

export default Home;
