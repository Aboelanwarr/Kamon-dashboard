import { useContext } from 'react';
import { UserDataContext } from '../authentication/userDataProvide';
import './Home.css'; // Import the CSS file

function Home(){
  const {userData} = useContext(UserDataContext);
  return(
    <div className="home-container"> {/* Apply class name */}
      <h1 className="greeting">Hello, {userData.employee_first_name}</h1> {/* Apply class name */}
    </div>
  )
}

export default Home;
